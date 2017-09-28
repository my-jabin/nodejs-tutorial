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
  expect(generateMessage(from, text)).toHaveProperty('from', from);
  expect(generateMessage(from, text)).toHaveProperty('text', text);
})


test('generate correct location object', () => {
  var from = "Yan";
  var latitude = "23.569245";
  var longitude = "4.1152474"
  var url = `https://www.google.com/maps?q=${latitude},${longitude}`
  expect(generateLocationMessage(from, latitude, longitude)).toHaveProperty('from', from);
  expect(generateLocationMessage(from, latitude, longitude)).toHaveProperty('url', url);
})
