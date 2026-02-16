'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AUDIO_TIMESTAMP_KEY = 'tdah_audio_timestamp';
const AUDIO_TRACK_KEY = 'tdah_audio_track';

const TRACKS = [
  {
    id: 'entendendo-tdah-main',
    title: 'Entendendo o TDAH',
    subtitle: 'Guia pratico e acolhedor',
    src: '/api/content/audio',
  },
];

const SPEEDS = [1, 1.5, 2];

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function AudiobookPlayerPage() {
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [pendingRestoreTime, setPendingRestoreTime] = useState(null);

  const track = TRACKS[trackIndex];
  const hasPrev = trackIndex > 0;
  const hasNext = trackIndex < TRACKS.length - 1;

  useEffect(() => {
    const savedTrackId = localStorage.getItem(AUDIO_TRACK_KEY);
    const savedTimestamp = Number.parseFloat(localStorage.getItem(AUDIO_TIMESTAMP_KEY) || '0');

    const savedIndex = TRACKS.findIndex((item) => item.id === savedTrackId);
    if (savedIndex >= 0) {
      setTrackIndex(savedIndex);
    }

    if (!Number.isNaN(savedTimestamp) && savedTimestamp > 0) {
      setPendingRestoreTime(savedTimestamp);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(AUDIO_TRACK_KEY, track.id);
  }, [track.id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      if (pendingRestoreTime !== null) {
        const safeTime = Math.min(Math.max(pendingRestoreTime, 0), Math.max((audio.duration || 0) - 0.2, 0));
        audio.currentTime = safeTime;
        setCurrentTime(safeTime);
        setPendingRestoreTime(null);
      }
      audio.playbackRate = speed;
    };

    const onTimeUpdate = () => {
      const time = audio.currentTime || 0;
      setCurrentTime(time);
      localStorage.setItem(AUDIO_TIMESTAMP_KEY, String(time));
      localStorage.setItem(AUDIO_TRACK_KEY, track.id);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      if (hasNext) {
        setTrackIndex((idx) => idx + 1);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
    };
  }, [track.id, speed, pendingRestoreTime, hasNext]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = speed;
  }, [speed]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  const seekTo = (nextTime) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(nextTime)) return;

    const safe = Math.min(Math.max(nextTime, 0), duration || 0);
    audio.currentTime = safe;
    setCurrentTime(safe);
    localStorage.setItem(AUDIO_TIMESTAMP_KEY, String(safe));
    localStorage.setItem(AUDIO_TRACK_KEY, track.id);
  };

  const jumpBy = (deltaSeconds) => {
    seekTo(currentTime + deltaSeconds);
  };

  const cycleSpeed = () => {
    const index = SPEEDS.indexOf(speed);
    const next = SPEEDS[(index + 1) % SPEEDS.length];
    setSpeed(next);
  };

  const goTrack = async (direction) => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextIndex = trackIndex + direction;
    if (nextIndex < 0 || nextIndex >= TRACKS.length) return;

    const shouldResumePlaying = !audio.paused;
    setTrackIndex(nextIndex);
    setCurrentTime(0);
    setDuration(0);
    setPendingRestoreTime(0);
    localStorage.setItem(AUDIO_TRACK_KEY, TRACKS[nextIndex].id);
    localStorage.setItem(AUDIO_TIMESTAMP_KEY, '0');

    if (shouldResumePlaying) {
      requestAnimationFrame(async () => {
        const nextAudio = audioRef.current;
        if (!nextAudio) return;
        try {
          await nextAudio.play();
        } catch {
          setIsPlaying(false);
        }
      });
    }
  };

  const progressValue = useMemo(() => {
    if (!duration) return 0;
    return Math.min(currentTime, duration);
  }, [currentTime, duration]);
  const progressPct = useMemo(() => {
    if (!duration) return 0;
    return Math.max(0, Math.min(100, (progressValue / duration) * 100));
  }, [progressValue, duration]);

  return (
    <main className="audio-fs-page">
      <div className="audio-fs-background" aria-hidden="true">
        <Image
          src="/images/members/audiobook-cover.png"
          alt=""
          fill
          priority
          className="audio-fs-bg-image"
        />
        <div className="audio-fs-bg-overlay" />
      </div>

      <header className="audio-fs-topbar">
        <Link href="/dashboard" className="audio-fs-back-btn" aria-label="Voltar ao dashboard">
          <svg viewBox="0 0 24 24" className="audio-icon" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Voltar
        </Link>
      </header>

      <section className="audio-fs-cover-stage" aria-label="Capa do audiobook">
        <div className="audio-fs-cover-wrap">
          <Image
            src="/images/members/audiobook-cover.png"
            alt="Capa do e-book"
            width={860}
            height={860}
            priority
            className="audio-fs-cover"
          />
        </div>
      </section>

      <section className="audio-fs-controls" aria-label="Controles do player">
        <div className="audio-fs-track-meta">
          <h1 className="audio-fs-title">{track.title}</h1>
          <p className="audio-fs-subtitle">{track.subtitle}</p>
        </div>

        <div className="audio-fs-progress-row">
          <span className="audio-fs-time">{formatTime(progressValue)}</span>
          <input
            type="range"
            className="audio-fs-progress"
            min={0}
            max={duration || 0}
            step={0.1}
            value={progressValue}
            onChange={(e) => seekTo(Number.parseFloat(e.target.value))}
            aria-label="Progresso do audio"
            style={{ '--progress-pct': `${progressPct}%` }}
          />
          <span className="audio-fs-time">{formatTime(duration)}</span>
        </div>

        <div className="audio-fs-main-controls">
          <button
            type="button"
            className="audio-fs-btn audio-fs-btn--secondary"
            onClick={() => jumpBy(-10)}
            aria-label="Retroceder 10 segundos"
          >
            <svg viewBox="0 0 24 24" className="audio-icon" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M11 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            -10s
          </button>

          <button
            type="button"
            className="audio-fs-btn audio-fs-btn--play"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" className="audio-icon audio-icon--play" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="audio-icon audio-icon--play" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            className="audio-fs-btn audio-fs-btn--secondary"
            onClick={() => jumpBy(10)}
            aria-label="Avancar 10 segundos"
          >
            +10s
            <svg viewBox="0 0 24 24" className="audio-icon" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="audio-fs-extra-controls">
          <button
            type="button"
            className="audio-fs-btn audio-fs-btn--chip"
            onClick={() => goTrack(-1)}
            disabled={!hasPrev}
          >
            Faixa anterior
          </button>

          <button
            type="button"
            className="audio-fs-btn audio-fs-btn--chip audio-fs-btn--speed"
            onClick={cycleSpeed}
            aria-label="Velocidade da reproducao"
          >
            {speed}x
          </button>

          <button
            type="button"
            className="audio-fs-btn audio-fs-btn--chip"
            onClick={() => goTrack(1)}
            disabled={!hasNext}
          >
            Proxima faixa
          </button>
        </div>
      </section>

      <audio ref={audioRef} src={track.src} preload="metadata" className="audio-fs-hidden" />
    </main>
  );
}
