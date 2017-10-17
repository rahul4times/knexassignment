
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {content: 'Me too!', user_id: 1, post_id: 1}
      ]);
    });
};
