const expect = require('chai').expect;
const { Profile } = require('../../../db/models');
const dbUtils = require('../../../db/lib/utils.js');

const modelName = 'profile';
const model = Profile;

describe(`${modelName.toUpperCase()} model tests`, function() {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function(done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function(done) {
    dbUtils.rollback(done);
  });

  it('Should be able to retrieve test data', function(done) {
    model.forge()
      .fetchAll()
      .then(function(results) {
        expect(results.length).to.be.greaterThan(0);
        expect(results.at(0).get('id')).to.equal(1);
        done();
      })
      .catch(function(err) {
        // If this expect statement is reached, there's an error.
        done(err);
      });
  });

  it(`Should be able to update an already existing ${modelName}`, function(done) {
    const updateObj = { first: 'John', last: 'Doe' };
    const updateCols = Object.keys(updateObj);
    const expected = Object.values(updateObj);

    model.where({ id: 1 })
      .fetch()
      .then(function(result) {
        expect(result.get('id')).to.equal(1);
      })
      .then(function() {
        return model.where({ id: 1 }).save(updateObj, { method: 'update' });
      })
      .then(function() {
        return model.where({ id: 1 }).fetch();
      })
      .then(function(result) {
        updateCols.forEach((col, i) => expect(result.get(col)).to.equal(expected[i]));
        done();
      })
      .catch(function(err) {
        // If this expect statement is reached, there's an error.
        done(err);
      });
  });

  it(`Should be able to delete ${modelName}`, function(done) {
    model.where({ id: 1 })
      .destroy()
      .then(function() {
        return model.where({ id: 1 }).fetch();
      })
      .then(function(result) {
        expect(result).to.equal(null);
        done();
      })
      .catch(function(err) {
        // If this expect statement is reached, there's an error.
        done(err);
      });
  });
});



  // it('Should verify that all usernames are unique', function (done) {
  //   // Insert a user with a username that's already in existence
  //   Profile.forge({ username: 'TestUser1', password: 'abc' }).save()
  //     .then(function (result) {
  //       done(new Error('was not supposed to succeed'));
  //     })
  //     .catch(function (err) {
  //       expect(err).to.be.an('error');
  //       expect(err).to.match(/duplicate key value violates unique constraint/);
  //       done();
  //     });
  // });
