import axios from 'axios';
import { IBlogState } from '../../app/interface/request/blogState';
import { BLOG_PUBLISH, BLOG_SAVE } from '../endpoints';

export class blogService {
  static PublishBlog = async (request: IBlogState) => {
    const reponse = await axios.post(BLOG_PUBLISH, request);
    return reponse;
  };

  static SaveBlog = async (request: IBlogState) => {
    const response = await axios.post(BLOG_SAVE, request);
    return response;
  };
}
