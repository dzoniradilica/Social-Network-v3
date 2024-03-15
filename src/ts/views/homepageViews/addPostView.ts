import { ConfigUser } from '../../configs/user-config';
import { ConfigPost } from '../../configs/post-config';
import { post } from '../../models/Post.js';

class AddPostView {
  private addPost = document.querySelector('#addPost')!;
  private parentElement = document.querySelector(
    '.posts-parent-element'
  )! as HTMLDivElement;

  addPostHandler(handler: Function) {
    this.addPost.addEventListener('click', e => {
      e.preventDefault();

      const postContent = (
        document.querySelector('#addPostContent')! as HTMLInputElement
      ).value;

      handler(postContent);
    });
  }

  createPost(postData: ConfigPost, userData: ConfigUser) {
    this.renderPost('post', postData, userData);

    const postInput = document.querySelector(
      '#addPostContent'
    )! as HTMLInputElement;
    postInput.value = '';
  }

  displayAllPosts(postData: ConfigPost[], singleUser: ConfigUser) {
    this.parentElement.innerHTML = '';

    postData.forEach(singlePost => {
      this.renderPost('posts', singlePost, singleUser);
    });
  }

  private renderPost(
    type: 'post' | 'posts',
    singlePost: ConfigPost,
    userData: ConfigUser
  ): any {
    const html = `
          <div class="post" data-post_id = "${singlePost.id}">
              <div class="person-info">
                  <img src="images/person.png" alt="person" />
                  <div>
                      <h3 class="author">${
                        type === 'post'
                          ? `<h3 class="author">${userData.username}</h3>`
                          : singlePost.author
                      }</h3>
                      <p class="date">2 days ago</p>
                  </div>
              </div>

              <div class="post-content">
                  <p>${singlePost.content}</p>
              </div>

              <div class="like-comments-wrapper">
                  <span id="likes">${singlePost.likes}</span>
                  <img src="images/heart.png" alt="like" class="heart" />
                  <img src="images/comment (1).png" alt="comment" />

                  ${
                    type === 'post'
                      ? `<button id="deletePost">Delete</button>`
                      : singlePost.author === userData.username
                      ? '<button id="deletePost">Delete</button>'
                      : ''
                  }
              </div>
          </div>
          `;
    this.parentElement.insertAdjacentHTML('afterbegin', html);

    this.addDeleteHandler('#deletePost');
  }

  private async addDeleteHandler(deleteBtnId: string) {
    const deleteBtn = document.querySelector(
      `${deleteBtnId}`
    ) as HTMLButtonElement;

    deleteBtn?.addEventListener('click', e => {
      e.preventDefault();

      const postDiv = (e.target! as HTMLButtonElement).closest(
        '.post'
      )! as HTMLDivElement;
      const postId = +postDiv.dataset.post_id!;

      setTimeout(() => {
        postDiv.remove();

        post.delete(postId);
      }, 1000);
    });
  }
}

export const addPostView = new AddPostView();
