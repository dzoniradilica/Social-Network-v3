class AddPostView {
  private addPost = document.querySelector('#addPost')!;
  //   private parentElement = document.querySelector('.posts-parent-element');

  addPostHandler(handler: Function) {
    this.addPost.addEventListener('click', e => {
      e.preventDefault();

      const postContent = (
        document.querySelector('#addPostContent')! as HTMLInputElement
      ).value;

      handler(postContent);
    });
  }

  createPost() {
    const html = `
    <div class="post">
        <div class="person-info">
            <img src="images/person.png" alt="person" />
            <div>
                <h3 class="author">Nikola</h3>
                <p class="date">2 days ago</p>
            </div>
        </div>

        <div class="post-content">
            <p>This is some post about something</p>
        </div>

        <div class="like-comments-wrapper">
            <img src="images/heart.png" alt="like" />
            <img src="images/comment (1).png" alt="comment" />
        </div>
    </div>
    `;
    console.log(html);
  }
}

export const addPostView = new AddPostView();
