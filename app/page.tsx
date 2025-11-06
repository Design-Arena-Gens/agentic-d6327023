'use client';

import { useMemo, useState } from 'react';

type Style = 'Salsa' | 'Bachata' | 'Kizomba';

type Day = 'Maandag' | 'Dinsdag' | 'Woensdag' | 'Donderdag';

type ClassItem = {
  id: string;
  style: Style;
  day: Day;
  time: string; // e.g. "19:00 ? 20:00"
  level: string; // e.g. "Beginner", "Improver"
  teacher: string;
  room?: string;
};

const ALL_STYLES: Style[] = ['Salsa', 'Bachata', 'Kizomba'];
const ALL_DAYS: Day[] = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag'];

const SCHEDULE: ClassItem[] = [
  // Monday
  { id: 'mo-1', style: 'Salsa', day: 'Maandag', time: '18:30 ? 19:30', level: 'Beginner', teacher: 'Carlos & Ana', room: 'Studio A' },
  { id: 'mo-2', style: 'Bachata', day: 'Maandag', time: '19:45 ? 20:45', level: 'Improver', teacher: 'Luis & Maria', room: 'Studio B' },
  { id: 'mo-3', style: 'Kizomba', day: 'Maandag', time: '21:00 ? 22:00', level: 'Open Level', teacher: 'Nuno & Sara', room: 'Studio A' },
  // Tuesday
  { id: 'tu-1', style: 'Bachata', day: 'Dinsdag', time: '18:30 ? 19:30', level: 'Beginner', teacher: 'Diego & Camila', room: 'Studio B' },
  { id: 'tu-2', style: 'Salsa', day: 'Dinsdag', time: '19:45 ? 20:45', level: 'Intermediate', teacher: 'Carlos & Ana', room: 'Studio A' },
  { id: 'tu-3', style: 'Kizomba', day: 'Dinsdag', time: '21:00 ? 22:00', level: 'Improver', teacher: 'Nuno & Sara', room: 'Studio A' },
  // Wednesday
  { id: 'we-1', style: 'Kizomba', day: 'Woensdag', time: '18:30 ? 19:30', level: 'Beginner', teacher: 'Nuno & Sara', room: 'Studio A' },
  { id: 'we-2', style: 'Bachata', day: 'Woensdag', time: '19:45 ? 20:45', level: 'Intermediate', teacher: 'Luis & Maria', room: 'Studio B' },
  { id: 'we-3', style: 'Salsa', day: 'Woensdag', time: '21:00 ? 22:00', level: 'Advanced', teacher: 'Carlos & Ana', room: 'Studio A' },
  // Thursday
  { id: 'th-1', style: 'Salsa', day: 'Donderdag', time: '18:30 ? 19:30', level: 'Improver', teacher: 'Carlos & Ana', room: 'Studio A' },
  { id: 'th-2', style: 'Bachata', day: 'Donderdag', time: '19:45 ? 20:45', level: 'Advanced', teacher: 'Luis & Maria', room: 'Studio B' },
  { id: 'th-3', style: 'Kizomba', day: 'Donderdag', time: '21:00 ? 22:00', level: 'Open Level', teacher: 'Nuno & Sara', room: 'Studio A' },
];

function Chip({ label, active, color, onClick }: { label: string; active: boolean; color?: 'red' | 'gold'; onClick: () => void }) {
  return (
    <button
      className={`chip ${active ? 'active' : ''} ${color === 'red' ? 'red' : ''}`}
      onClick={onClick}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

export default function Page() {
  const [selectedStyles, setSelectedStyles] = useState<Set<Style>>(new Set(ALL_STYLES));
  const [selectedDays, setSelectedDays] = useState<Set<Day>>(new Set(ALL_DAYS));

  const toggleStyle = (s: Style) => {
    setSelectedStyles(prev => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s); else next.add(s);
      if (next.size === 0) ALL_STYLES.forEach(st => next.add(st));
      return next;
    });
  };

  const toggleDay = (d: Day) => {
    setSelectedDays(prev => {
      const next = new Set(prev);
      if (next.has(d)) next.delete(d); else next.add(d);
      if (next.size === 0) ALL_DAYS.forEach(dd => next.add(dd));
      return next;
    });
  };

  const filtered = useMemo(() => {
    return SCHEDULE.filter(item => selectedStyles.has(item.style) && selectedDays.has(item.day));
  }, [selectedStyles, selectedDays]);

  return (
    <>
      <section className="hero">
        <h2>Lesrooster</h2>
        <p>Salsa ? Bachata ? Kizomba ? maandag t/m donderdag</p>
      </section>

      <section className="filters">
        <div className="filter-group">
          <div className="filter-title">
            <span>Dansstijlen</span>
            <div className="legend">
              <span className="dot salsa" /> Salsa
              <span className="dot bachata" /> Bachata
              <span className="dot kizomba" /> Kizomba
            </div>
          </div>
          <div className="chips">
            {ALL_STYLES.map(s => (
              <Chip
                key={s}
                label={s}
                active={selectedStyles.has(s)}
                color={s === 'Salsa' ? 'red' : 'gold'}
                onClick={() => toggleStyle(s)}
              />
            ))}
          </div>
        </div>

        <div className="filter-group">
          <div className="filter-title">
            <span>Dagen</span>
          </div>
          <div className="chips">
            {ALL_DAYS.map(d => (
              <Chip
                key={d}
                label={d}
                active={selectedDays.has(d)}
                onClick={() => toggleDay(d)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="schedule" aria-live="polite">
        <div className="row header" role="row">
          <div>Dag</div>
          <div>Tijd</div>
          <div>Les</div>
          <div className="col-extra">Docent</div>
          <div className="col-extra">Studio</div>
        </div>
        {filtered.map(item => (
          <div className="row" role="row" key={item.id}>
            <div>{item.day}</div>
            <div>{item.time}</div>
            <div>
              <span className={`tag ${item.style.toLowerCase()}`}>
                <span className="dot" /> {item.style}
              </span>
              <span className="level" style={{ marginLeft: 10 }}>? {item.level}</span>
            </div>
            <div className="col-extra">{item.teacher}</div>
            <div className="col-extra">{item.room ?? '?'}</div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="row" role="row">
            <div style={{ gridColumn: '1 / -1', color: 'var(--muted)' }}>
              Geen lessen gevonden met de huidige filters.
            </div>
          </div>
        )}
      </section>
    </>
  );
}
