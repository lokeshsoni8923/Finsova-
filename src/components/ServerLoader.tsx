export default function ServerLoader({ message = 'Loading...' }: { message?: string }) {
  return (
    <div
      style={{
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px'
      }}
      aria-busy
      aria-live="polite"
    >
      <div
        style={{
          width: '42px',
          height: '42px',
          border: '4px solid #e0e0e0',
          borderTopColor: '#1976d2',
          borderRadius: '50%',
          animation: 'server-loader-spin 1s linear infinite'
        }}
      />
      <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{message}</div>
      <style>{`
        @keyframes server-loader-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}


