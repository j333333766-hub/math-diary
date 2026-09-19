/* 수학 일기앱 — 서버 주소
 *
 * 이 한 줄만 바꾸면 서버를 옮길 수 있다.
 * clasp update-deployment 로 같은 배포ID에 다시 올리면 주소는 그대로다.
 *   배포ID : AKfycbyL-Katu9WdWpS3844DlEX8rl_Iq5q1QhVNCsPo1I2rCL6Kqe9aiMXGkTI8_6Mdl8I3
 */
window.ENDPOINT =
  'https://script.google.com/macros/s/AKfycbyL-Katu9WdWpS3844DlEX8rl_Iq5q1QhVNCsPo1I2rCL6Kqe9aiMXGkTI8_6Mdl8I3/exec';

/* 서버에 말 걸기.
 * Content-Type 을 text/plain 으로 두는 것이 핵심이다 — 그래야 사전요청(preflight)이 붙지 않아
 * 다른 출처(GitHub Pages)에서도 응답 본문을 그대로 읽을 수 있다.
 */
window.api = async function (action, data) {
  const body = JSON.stringify(Object.assign({ action }, data || {}));
  let res;
  try {
    res = await fetch(window.ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body
    });
  } catch (e) {
    throw new Error('인터넷 연결을 확인해 주세요.');
  }
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    // 승인 전이거나 배포가 꼬이면 구글이 HTML 오류 페이지를 준다
    if (res.status === 403) throw new Error('서버가 아직 열리지 않았습니다. 선생님께 알려 주세요. (403)');
    throw new Error('서버 응답을 읽을 수 없습니다. (' + res.status + ')');
  }
};

/* 사람이 읽는 오류 문구 */
window.ERRMSG = {
  auth: '로그인이 만료되었습니다. 다시 들어와 주세요.',
  not_open: '이 반은 아직 열려 있지 않습니다.',
  no_roster: '명렬표를 찾지 못했습니다. 선생님께 알려 주세요.',
  notfound: '그 번호의 학생이 없습니다. 번호를 확인해 주세요.',
  inactive: '지금은 로그인할 수 없는 번호입니다. 선생님께 알려 주세요.',
  no_birth_on_file: '명렬표에 생년월일이 비어 있습니다. 선생님께 알려 주세요.',
  birth_empty: '생년월일을 골라 주세요.',
  no_class: '그 시간에는 수학 수업이 없습니다.',
  too_late: '작성 기간이 지났습니다.',
  empty: '한 칸이라도 쓰거나 별점을 골라 주세요.',
  busy: '지금 저장이 몰리고 있어요. 잠시 뒤 다시 눌러 주세요.',
  closed: '지금은 일기 쓰기가 잠겨 있습니다.',
  server: '서버에서 문제가 생겼습니다.',
  pw: '비밀번호가 맞지 않습니다.',
  short: '비밀번호는 4자 이상이어야 합니다.',
  not_installed: '서버 설치가 아직 안 되었습니다. 편집기에서 설치() 를 실행하세요.'
};
