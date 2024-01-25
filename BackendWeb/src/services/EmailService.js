const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()
 var inlineBase64 = require('nodemailer-plugin-inline-base64');

const sendEmailCreateOrder = async (email,orderItems) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_ACCOUNT, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });
  transporter.use('compile', inlineBase64({cidPrefix: 'somePrefix_'}));

  let listItem = '';
  const attachImage = []
  orderItems.forEach((order) => {
    listItem += `<div>
    <div>
      Bạn đã đặt sản phẩm <b>: ${order.name}</b> 
      Số lượng: <b>${order.amount}</b> 
      Giá: <b>${order.price} VND</b></div>
      <div>Bên dưới là hình ảnh của sản phẩm</div>
    </div>`
    attachImage.push({path: order.image})
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.MAIL_ACCOUNT, // sender address
    to: email, // list of receivers
    subject: "Bạn đã đặt hàng tại ", // Subject line
    text: "Hello world?", // plain text body
    html: `<div><b>Bạn đã đặt hàng thành công tại shop Chúng tôi xin chân thành cảm ơn quý khách hàng đã lựa chọn sản phẩm/dịch vụ của chúng tôi và đã hoàn tất việc đặt hàng thành công. Sự ủng hộ và niềm tin của quý khách hàng là nguồn động viên quý báu cho chúng tôi trong việc cung cấp sản phẩm/dịch vụ chất lượng.

    Chúng tôi cam kết sẽ không ngừng cải thiện và nâng cao chất lượng dịch vụ của mình để đảm bảo rằng quý khách hàng nhận được sự hài lòng tuyệt đối. Hãy yên tâm rằng chúng tôi sẽ làm hết sức mình để đảm bảo đơn hàng của quý khách hàng được xử lý một cách nhanh chóng và hiệu quả.
    
    Nếu quý khách hàng có bất kỳ câu hỏi hoặc yêu cầu đặc biệt nào liên quan đến đơn hàng, xin vui lòng liên hệ với chúng tôi hoặc qua email tại [phuocgfs@gmail.com]. Chúng tôi luôn sẵn sàng hỗ trợ quý khách hàng.
    
    Một lần nữa, chúng tôi xin gửi lời cảm ơn chân thành và hy vọng sẽ có cơ hội phục vụ quý khách hàng thêm nhiều lần nữa trong tương lai.</b></div> ${listItem}`,
    attachments: attachImage,
  });
}

module.exports = {
  sendEmailCreateOrder
}