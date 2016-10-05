var userSchema = mongoose.Schema({
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  firstName: {
      type: String,
      required: true
  },
  lastName: {
      type: String,
      required: true
  }
});

var User = mongoose.model('User', userSchema);

// Test
// var cole = new User({email: "colehjohn@purdue.edu", password: "pass", firstName: "Cole", lastName: "Johnson"});
// console.log("This is directly accessing the model");
// console.log(cole.email);
// console.log(cole.password);
// console.log(cole.firstName);
// console.log(cole.lastName);
//
// cole.save(function(err, cole) {
// if(err) return console.error(err);
// });
//
// console.log("This is pulling from the db");
// User.find(function(err, users) {
// if(err) return console.error(err);
// console.log(users);
// });
