import React , {Component} from 'react'
import { Link } from 'react-router'
import { login, logout, isLoggedIn } from '../utils/AuthService'
import '../App.css'
import madrugaIcon from '../icon.png'

class Nav extends Component {
  render() {
    return (
      <nav className='shadow fixed-top navbar dark text-light navbar-default'>
        <div className='navbar-header'>
          <Link className='navbar-brand' to='/'>
            Madruga
            <img className='ml-2' src={madrugaIcon} width='30' height='30'/>
          </Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Link to='/'>All Videos</Link>
          </li>
          <li>
            {
              ( isLoggedIn() ? <Link to='/upload'>Upload</Link> : "" )
            }
          </li>
        </ul>
        <ul className='nav navabar-nav navbar-right'>
          <li>
            {
              ( isLoggedIn() ? 
                ( <button className='btn btn-danger log' onClick= {() => logout()}> LogOut </button> ) 
                : (<button className='btn btn-light log' onClick={() => login()}>Log In</button>)
              )
            }
          </li>
        </ul>
      </nav>
    )
  }
}

export default Nav
