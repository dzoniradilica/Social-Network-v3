import { ConfigUser } from '../../configs/user-config';
import { ConfigPost } from '../../configs/post-config';
import { ConfigComment } from '../../configs/comment-config';

import { post } from '../../models/Post.js';
import { comment } from '../../models/Comment.js';
import { session } from '../../models/Session.js';

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
  ) {
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
                  <span id="likes" data-likes="${singlePost.likes}">${
      singlePost.likes
    }</span>
                  <button class="like-btn"> <img src="images/like.png" alt="like" class="like-image" />
                  <button class="comment-btn"><img src="images/comment (1).png" alt="comment" class="comment-image" /></button>

                  ${
                    type === 'post'
                      ? `<button id="deletePost">Delete</button>`
                      : singlePost.author === userData.username
                      ? '<button id="deletePost">Delete</button>'
                      : ''
                  }
              </div>
          </div>

          <div class="comment-parent">
            <div class="comment-wrapper"></div>
          </div>
          `;
    this.parentElement.insertAdjacentHTML('afterbegin', html);

    this.addLikes('.like-btn');
    this.addComments('.comment-btn');
    this.deletePost('#deletePost');
  }

  private addComments(commentBtnClass: string) {
    const commentBtn = document.querySelector(
      `${commentBtnClass}`
    ) as HTMLButtonElement;

    commentBtn.addEventListener('click', e => {
      const parentEl = (e.target! as HTMLButtonElement).closest(
        '.post'
      ) as HTMLDivElement;

      let html = `
      <hr style="margin-top: 0; margin-bottom: 0" />

      <div class="comment-parent">
        <div class="comment-wrapper">
          <label for="">Comment:</label>

          <div class="comment-inner">
            <input type="text" name="comment" id="commentText" />
            <button id="addComment">Add Comment</button>
          </div>
        </div>
      </div>
     `;

      parentEl.insertAdjacentHTML('beforeend', html);

      const img = (e.target! as HTMLButtonElement)
        .closest('.like-comments-wrapper')
        ?.querySelector('.comment-image') as HTMLImageElement;

      commentBtn.setAttribute('disabled', 'disabled');
      commentBtn.style.cursor = 'default';
      img.style.cursor = 'default';

      this.renderComment('#commentText', '#addComment');
    });
  }

  private renderComment(_: string, buttonId: string) {
    const addCommentBtns = document.querySelectorAll(`${buttonId}`)!;

    addCommentBtns.forEach(commentBtn => {
      commentBtn.addEventListener('click', e => {
        const commentContent = (e.target! as HTMLButtonElement)
          .previousElementSibling as HTMLInputElement;

        const parentEl = (e.target! as HTMLButtonElement).closest(
          '.post'
        ) as HTMLDivElement;

        const commentWrapper = (e.target! as HTMLButtonElement).closest(
          '.comment-wrapper'
        ) as HTMLDivElement;

        if (commentContent.value !== '') {
          const postId = +parentEl.dataset.post_id!;

          const createComment = async function () {
            const singleComment: ConfigComment = await comment.create(
              session.sessionId,
              postId,
              commentContent.value
            );

            const html = `
              <div class="comment" data-comment_id="${singleComment.id}>
                <p>${commentContent.value}</p>
              </div> 
        `;

            commentWrapper.insertAdjacentHTML('beforeend', html);
            // commentContent.value = '';
          };

          createComment();
        } else alert('You have to write comment!');
      });
    });
  }

  private addLikes(likeBtnClass: string) {
    const likeBtn = document.querySelector(
      `${likeBtnClass}`
    ) as HTMLButtonElement;

    likeBtn?.addEventListener('click', e => {
      async function getPostData() {
        const postDiv = (e.target! as HTMLImageElement).closest(
          '.post'
        )! as HTMLDivElement;
        const postId = +postDiv.dataset.post_id!;
        const postData: ConfigPost = await post.get(postId);

        const span = (e.target! as HTMLButtonElement).closest(
          '.like-comments-wrapper'
        )?.firstElementChild as HTMLSpanElement;

        const img = (e.target! as HTMLButtonElement)
          .closest('.like-comments-wrapper')
          ?.querySelector('.like-image') as HTMLImageElement;

        postData.likes++;
        span.innerText = `${postData.likes}`;

        post.change(postId, postData.likes);

        likeBtn.setAttribute('disabled', 'disabled');
        likeBtn.style.cursor = 'default';
        img.style.cursor = 'default';
      }

      getPostData();
    });
  }

  private async deletePost(deleteBtnId: string) {
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
        const commentParent = document.querySelectorAll(
          '.comment-wrapper'
        ) as NodeListOf<HTMLDivElement>;

        const commentsDiv = document.querySelectorAll(
          '.comment'
        ) as NodeListOf<HTMLDivElement>;

        commentsDiv.forEach(singleDiv => {
          const comment_id = +singleDiv.dataset.comment_id!;
          console.log(comment_id);

          comment.delete(comment_id, postId);
          console.log(commentParent);

          commentParent.forEach(el => {
            if (comment_id === +postId) el.remove();
          });
        });

        postDiv.remove();

        post.delete(postId);
      }, 1100);
    });
  }
}

export const addPostView = new AddPostView();
