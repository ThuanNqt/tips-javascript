const gTTS = require("gtts");

const speed =
  "Tỉnh Bắc Giang thuộc khu vực Đông Bắc Việt Nam, nằm trên tuyến Hành lang kinh tế Lạng Sơn - Hà Nội - Thành phố Hồ Chí Minh - Mộc Bài (thuộc Hành lang xuyên Á Nam Ninh - Singapore), tiếp giáp với Thủ đô Hà Nội và các tỉnh Bắc Ninh, Hải Dương, Lạng Sơn, Quảng Ninh, Thái Nguyên; liền kề “Tam giác kinh tế phát triển” Hà Nội - Hải Phòng - Quảng Ninh.";

const gtts = new gTTS(speed, "vi");
gtts.save("voice.mp3", (err) => {
  if (err) throw new Error(err);

  console.log("Text to speech converted");
});
