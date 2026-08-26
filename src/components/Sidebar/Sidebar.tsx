import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faTableColumns } from '@fortawesome/free-solid-svg-icons'
import './Sidebar.scss'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <h3>Catgirl</h3>
        <div>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <FontAwesomeIcon icon={faTableColumns} />
        </div>
      </div>
      <div className='sidebar-chat-tools'></div>
      <div className='sidebar-chat-history'></div>
    </div>
  )
}

export default Sidebar