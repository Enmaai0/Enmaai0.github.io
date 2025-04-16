import { createGlobalStyle } from 'styled-components';
import backgroundImage from '../assets/images/vista-background.svg';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #0078d7;
    --secondary-color: #5fb2ef;
    --text-color: #333333;
    --light-text: #ffffff;
    --border-radius: 8px;
    --glass-background: rgba(255, 255, 255, 0.7);
    --glass-border: rgba(255, 255, 255, 0.9);
    --glass-shadow: rgba(0, 0, 0, 0.1);
    --sidebar-width: 240px;
    --vista-green: #4cc265;
    --vista-blue: #0078d7;
    --max-content-width: 1200px;
    --content-padding: 20px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: var(--text-color);
    min-height: 100vh;
    overflow-x: hidden;
    cursor: default;
  }

  #root {
    display: flex;
    width: 100%;
    min-height: 100vh;
    max-width: 100%;
    margin: 0;
    padding: 0;
  }

  /* Glass effect styling */
  .glass {
    background: var(--glass-background);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    border-radius: var(--border-radius);
    box-shadow: 0 4px 15px var(--glass-shadow);
  }
  
  /* Frutiger Aero specific styles */
  .aero-panel {
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.95);
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
  }
  
  .aero-title-bar {
    background: linear-gradient(to bottom, #7eb6e9, #5fb2ef);
    border-radius: 8px 8px 0 0;
    padding: 8px 12px;
    color: white;
    font-weight: bold;
  }
  
  /* Custom cursors */
  a {
    cursor: pointer;
  }
  
  input, textarea {
    cursor: text;
  }

  /* Windows Vista/7 button style */
  .vista-button {
    background: linear-gradient(to bottom, #f0f0f0, #e1e1e1);
    border: 1px solid #b5b5b5;
    border-radius: var(--border-radius);
    padding: 8px 16px;
    color: var(--text-color);
    font-weight: 500;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
  }

  .vista-button:hover {
    background: linear-gradient(to bottom, #e9e9e9, #d5d5d5);
    border-color: #999999;
  }

  .vista-button:active {
    background: linear-gradient(to bottom, #d5d5d5, #e9e9e9);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  /* Links styling */
  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  a:hover {
    color: var(--secondary-color);
    text-decoration: underline;
  }
`;

export default GlobalStyles;