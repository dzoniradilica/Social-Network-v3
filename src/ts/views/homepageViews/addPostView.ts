import { ConfigUser } from '../../configs/user-config';
import { ConfigPost } from '../../configs/post-config';

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
    const html = `
    <div class="post">
        <div class="person-info">
            <img src="images/person.png" alt="person" />
            <div>
                <h3 class="author">${userData.username}</h3>
                <p class="date">2 days ago</p>
            </div>
        </div>

        <div class="post-content">
            <p>${postData.content}</p>
        </div>

        <div class="like-comments-wrapper">
            <span id="likes">${postData.likes}</span>
            <img src="images/heart.png" alt="like" class="heart" />
            <img src="images/comment (1).png" alt="comment" />

            <button id="deletePost">Delete</button>
        </div>
    </div>
    `;

    this.parentElement.insertAdjacentHTML('afterbegin', html);
    (document.querySelector('#addPostContent')! as HTMLInputElement).value = '';
  }

  displayAllPosts(postData: ConfigPost[], singleUser: ConfigUser) {
    this.parentElement.innerHTML = '';
    postData.forEach(singlePost => {
      const html = `
        <div class="post">
            <div class="person-info">
                <img src="images/person.png" alt="person" />
                <div>
                
                    <h3 class="author">${singlePost.author}</h3>
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
                  singleUser.username === singlePost.author
                    ? '<button id="deletePost">Delete</button>'
                    : ''
                }
            </div>
        </div>
        `;

      this.parentElement.insertAdjacentHTML('afterbegin', html);
      //   this.parentElement.innerHTML = '';
    });
  }

  //   private renderPost(
  //     type: 'post' | 'posts',
  //     singlePost: ConfigPost,
  //     userData: ConfigUser
  //   ) {
  //     const html = `
  //         <div class="post">
  //             <div class="person-info">
  //                 <img src="images/person.png" alt="person" />
  //                 <div>
  //                     <h3 class="author">${
  //                       type === 'post'
  //                         ? `<h3 class="author">${userData.username}</h3>`
  //                         : +singlePost.userId === +userData.id
  //                         ? userData.username
  //                         : ''
  //                     }</h3>
  //                     <p class="date">2 days ago</p>
  //                 </div>
  //             </div>

  //             <div class="post-content">
  //                 <p>${singlePost.content}</p>
  //             </div>

  //             <div class="like-comments-wrapper">
  //                 <span id="likes">${singlePost.likes}</span>
  //                 <img src="images/heart.png" alt="like" class="heart" />
  //                 <img src="images/comment (1).png" alt="comment" />

  //                 ${
  //                     type === 'post' ? `<button id="deletePost">Delete</button>` :
  //                   +singlePost.userId === +userData.id
  //                     ? '<button id="deletePost">Delete</button>'
  //                     : ''
  //                 }
  //             </div>
  //         </div>
  //         `;
  //         this.parentElement.insertAdjacentHTML('afterbegin', html)
  //   }
}

export const addPostView = new AddPostView();
