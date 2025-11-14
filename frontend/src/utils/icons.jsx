// SVG Icons for the application
export const icons = {
  moon: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  ),
  sun: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.83-2.83a1 1 0 00-1.414 1.414l2.83 2.83a1 1 0 001.414-1.414zM2.05 6.464a1 1 0 000-1.414L.464 3.05a1 1 0 00-1.414 1.414l1.586 1.586a1 1 0 001.414 0zm12.12 0l1.586-1.586a1 1 0 00-1.414-1.414l-1.586 1.586a1 1 0 001.414 1.414zM9 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
  ),
  briefcase: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v1.5a.5.5 0 00.5.5h11a.5.5 0 00.5-.5V4a2 2 0 00-2-2H6zM3.5 8.5A.5.5 0 003 9v6a2 2 0 002 2h10a2 2 0 002-2V9a.5.5 0 00-.5-.5h-13zM6 6.5a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h8a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5H6z" clipRule="evenodd" />
    </svg>
  ),
  location: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 10.166a5.96 5.96 0 011.64-4.224 6.002 6.002 0 018.056 0 5.96 5.96 0 011.64 4.224 6.002 6.002 0 01-4.868 5.736A1.503 1.503 0 0110 14.5c-.828 0-1.5-.672-1.5-1.5 0-.175.03-.344.086-.5a5.96 5.96 0 01-4.254-2.334z" clipRule="evenodd" />
    </svg>
  ),
  calendar: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
  ),
  search: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
    </svg>
  ),
  user: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 6a3 3 0 116 0 3 3 0 01-6 0zM5.646 13.354a5.5 5.5 0 018.708 0A6.974 6.974 0 0110 16a6.974 6.974 0 01-4.354-2.646z" clipRule="evenodd" />
    </svg>
  ),
  logout: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V5.414l4.293 4.293a1 1 0 001.414-1.414L5.414 3H12a1 1 0 100-2H4a1 1 0 00-1 1z" clipRule="evenodd" />
      <path fillRule="evenodd" d="M16 3a1 1 0 011 1v12a1 1 0 01-1 1h-6a1 1 0 110-2h5V4.414l-4.293 4.293a1 1 0 11-1.414-1.414L14.586 3H16z" clipRule="evenodd" />
    </svg>
  ),
  menu: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
  close: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

