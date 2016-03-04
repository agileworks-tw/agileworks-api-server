describe('auth', () => {
  describe('sinup', function() {
    it('should be add a user', function() {
      let userData = {
        email: 'test@gmail.com',
        password: '123456',
        username: 'test'
      };
      let result = await request.post("/rest/auth/register/").send(userData);

    });
  });

  describe('local login spec', () => {

    before(async (done) => {

      let testUser = {
        'username': 'test',
        'password': 'test',
        'email': 'test@test.com',
      }
      await models.User.create(testUser);
      done();

    });

    it('do login should be success.', async (done) => {
      let loginUserFormData = {
        'username': 'test',
        'password': 'test'
      };

      let loginResult = await new Promise((resolve, reject) => {
        request.post('/rest/auth/login')
        .send(loginUserFormData)
        .expect(200)
        .end((error, res) => {

          if (error) return reject(error);
          return resolve(res.body);
        })
      });

      loginResult.success.should.be.true;

      let authResult = await new Promise((resolve, reject) => {
        request.get('/rest/auth/status')
        .expect(200)
        .end((error, res) => {
          if (error) return reject(error);
          return resolve(res.body);
        })
      });

      let sessionUser = authResult.sessionUser;
      let isAuthenticated = authResult.isAuthenticated;

      isAuthenticated.should.be.true;

      try {
        sessionUser.should.be.Object;
        sessionUser.should.have.contain.keys('id', 'username', 'email');
        console.log('=== sessionUser ===', sessionUser);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});