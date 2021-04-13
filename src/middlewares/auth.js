const jwt = require('../modules/jwt');
const CODE = require('../modules/statusCode.js');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
  checkToken: async (req, res, next) => {
    var token = req.headers.authorization.split('Bearer ')[1];
    // 토큰 없음
    if (!token)
      return res
        .status(CODE.BAD_REQUEST)
        .json({ message: '토큰이 존재하지 않습니다.' });
    // token 검증
    const user = await jwt.verify(token);
    // 유효기간 만료
    if (user === TOKEN_EXPIRED)
      return res
        .status(CODE.UNAUTHORIZED)
        .json({ message: '토큰의 유효기간이 지났습니다.' });
    // 유효하지 않는 토큰
    if (user === TOKEN_INVALID)
      return res
        .status(CODE.UNAUTHORIZED)
        .json({ message: '토큰의 유효하지 않습니다.' });
    req.email = user.email;
    next();
  },
};

module.exports = authUtil;
