import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import styles from './Dashboard.module.css';

export const Dashboard: React.FC = () => {
  const store = useApp();

  const stats = useMemo(() => {
    const visaTotal = store.visas.reduce((sum, v) => sum + v.price, 0);
    const flightTotal = store.flightPackages.reduce((sum, p) => sum + p.priceSingle, 0);
    return {
      visaCount: store.visas.length,
      flightCount: store.flightPackages.length,
      airlineCount: store.airlines.length,
      visaTotal,
      flightTotal,
      totalValue: visaTotal + flightTotal,
    };
  }, [store.visas, store.flightPackages, store.airlines]);

  const recentVisas = store.visas.slice(-5).reverse();
  const recentFlights = store.flightPackages.slice(-5).reverse();
  const recentAirlines = store.airlines.slice(-5).reverse();

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>

      <div className={styles.statsGrid}>
        <div className={styles.card}>
          <h3>Total Visas</h3>
          <div className={styles.stat}>{stats.visaCount}</div>
          <p className={styles.subtext}>${stats.visaTotal.toFixed(2)}</p>
        </div>
        <div className={styles.card}>
          <h3>Total Flights</h3>
          <div className={styles.stat}>{stats.flightCount}</div>
          <p className={styles.subtext}>${stats.flightTotal.toFixed(2)}</p>
        </div>
        <div className={styles.card}>
          <h3>Total Airlines</h3>
          <div className={styles.stat}>{stats.airlineCount}</div>
          <Link to="/airlines" className={styles.link}>Manage Airlines</Link>
        </div>
        <div className={styles.card}>
          <h3>Total Value</h3>
          <div className={styles.stat}>${stats.totalValue.toFixed(2)}</div>
          <Link to="/visas" className={styles.link}>All Details</Link>
        </div>
        <div className={styles.card}>
          <h3>Quick Actions</h3>
          <div className={styles.actions}>
            <Link to="/visas" className={styles.button}>Add Visa</Link>
            <Link to="/flights" className={styles.button}>Add Flight</Link>
            <Link to="/airlines" className={styles.button}>Add Airline</Link>
          </div>
        </div>
      </div>

      <div className={styles.recentSection}>
        <div className={styles.column}>
          <h2>Recent Visas</h2>
          {recentVisas.length === 0 ? (
            <p>No visas yet.</p>
          ) : (
            <ul className={styles.list}>
              {recentVisas.map((v) => (
                <li key={v.id} className={styles.item}>
                  <strong>{v.country}</strong> ({v.type}) - ${v.price}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.column}>
          <h2>Recent Flights</h2>
          {recentFlights.length === 0 ? (
            <p>No flights yet.</p>
          ) : (
            <ul className={styles.list}>
              {recentFlights.map((f) => (
                <li key={f.id} className={styles.item}>
                  <strong>{f.airline}</strong> - ${f.priceSingle}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.column}>
          <h2>Recent Airlines</h2>
          {recentAirlines.length === 0 ? (
            <p>No airlines yet.</p>
          ) : (
            <ul className={styles.list}>
              {recentAirlines.map((a) => (
                <li key={a.id} className={styles.item}>
                  <strong>{a.name}</strong> ({a.code}) - {a.department}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
