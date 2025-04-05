const express = require("express");
const app = express();
const { get, set, setnx, incrby, exists } = require("./model.redis");

app.get("/order", async (req, res) => {
  const time = new Date().getTime();
  console.log(`Time request: ${time}`);

  // Gia su so luong hang ton kho la 10
  const slTonKho = 10;

  // Ten san pham
  const keyName = "iPhone 14 Pro Max";

  // Gia su moi lan mua la 1
  const slMua = 1;

  // So luong da ban ra, neu chua ban thi set = 0, con neu ban thi update + 1 moi lan mua hang thanh cong
  const getKey = await exists(keyName);

  if (!getKey) {
    await setnx(keyName, 0); // Neu co 2 hay nhieu request truy cap cung luc thi se khong bi dat lai
  }

  // Lay so luong da ban ra
  let slBanRa = await get(keyName);
  console.log("So luong da ban ra: ", slBanRa);

  slBanRa = await incrby(keyName, slMua); // atom redis

  // Neu so luong ban ra + so luong mua > so luong ton kho => false
  if (slBanRa > slTonKho) {
    console.log(">>>> HET HANG <<<<");
    return res.json({
      status: "error",
      msg: "##### HET HANG #####",
      time,
    });
  }

  // Neu user order thanh cong thi san pham se duoc cong them so luong mua vao
  console.log("Da ban ra: ", slBanRa);

  if (slBanRa > slTonKho) {
    await set("ban-qua-so-luong", +slBanRa - slTonKho);
  }

  return res.json({
    status: "success",
    msg: "Ok",
    time,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port ", 3000);
});
