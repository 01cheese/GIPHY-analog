import axios from 'axios';

const BASEURL = process.env.REACT_APP_API_BASEURL;

export default class GifService {
  static async deleteGif(id) {
    const token = localStorage.getItem('token');
    return axios.delete(
        `${BASEURL}api/user/remove-gif/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  static async saveGif({ id, title, url }) {
    const token = localStorage.getItem('token');
    return axios.post(
        `${BASEURL}api/user/save-gif`,
        { gif: { id, title, url } },
        { headers: { Authorization: `Bearer ${token}` } }
    );
  }
}
