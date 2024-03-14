class Session {
  sessionId: string | number = document.cookie.split('=')[1];

  create(cvalue: string | number) {
    const d = new Date();
    d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = 'user' + '=' + cvalue + ';' + expires + ';path=/';
  }

  get(cname: string) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        console.log(c.substring(name.length, c.length));

        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  delete(name: string) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }
}

export const session = new Session();
