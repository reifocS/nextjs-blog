import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const DarkModeToggle = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const nextTheme = theme === 'light' ? 'dark' : 'light'

  React.useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  return (

    <div className="theme-switch-wrapper">
      <label className="theme-switch" htmlFor="checkbox">
        <input type="checkbox" onChange={() => setTheme(nextTheme)} id="checkbox" />
        <div className="slider round"></div>
      </label>
      &nbsp;&nbsp;<em>Enable {nextTheme} Mode!</em>
    </div>
  );
};

export default DarkModeToggle;