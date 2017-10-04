var {
  generateMessage,
  generateLocationMessage
} = require("./message")

// describe('generateMessage', () => {
//   it('should generate correct message object')
// });


test('generate correct message object', () => {
  var from = "Yan";
  var text = "This is a message";
  var message = generateMessage(from, text)
  expect(message).toHaveProperty('from', from);
  expect(message).toHaveProperty('text', text);
})


test('generate correct location object', () => {
  var from = "Yan";
  var latitude = "23.569245";
  var longitude = "4.1152474"
  var url = `https://www.google.com/maps?q=${latitude},${longitude}`
  var message = generateLocationMessage(from, latitude, longitude)
  expect(message).toHaveProperty('from', from);
  expect(message).toHaveProperty('url', url);
  expect(message.createdAt).toBeGreaterThan(0);
})
