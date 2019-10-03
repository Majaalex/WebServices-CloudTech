import axios from 'axios'

const remove = url => {
    axios.delete(url)
}

export default { remove }