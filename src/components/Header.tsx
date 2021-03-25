import '../stylesheets/Header.css';
import ClearbladeLogo from '../resources/cb_logo.png'

/**
 * This functional component is stateless and represents the header of the app. It has an image, title, and button linking to source code.
 * @returns header component
 */
function Header(): JSX.Element{
  return (
    <div className="header">
      <img src={ClearbladeLogo} alt="Clearblade logo" className="logo" />
      <h1>To Do</h1>
      <button className="source" onClick={(e) => {
        e.preventDefault();
        window.location.href = 'https://github.com/yanDavid21/ClearBlade-intern-project';
      }}>Source</button>
    </div>
  );
}

export default Header;
