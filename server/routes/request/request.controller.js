const Database = require('../../util/Database');

exports.creaetRequest = (req, res) => {
  const { id } = req.params;
  const date = new Date();
  let status = 500;

  Database.query('insert into request values(?, ?, ?)', [id, date, JSON.stringify(req)])
    .then(result => {
      if(result.affectedRows !== 1)  {
        return res.status(400).end();
      }

      return res.status(201).end();
    })
    .catch(err => {
      return res.status(500).end();
    })
};

exports.readRequest = (req, res) => {
  const { id } = req.decoded;
  let status = 500;
  let response = {
    requests: []
  };

  Database.query('select * from request where id = ?', [id])
    .then(results => {
      if(results.length< 0) {
        return res.status(400).end();
      }

      results.map(result => {
        let request = {
          date: result.date,
          requestInfo: JSON.parse(result.request_info)
        }
        return response.requests.push(request);
      });

      return res.status(200).json(response);
    })
    .catch(err => {
      return res.status(500).end();
    }) 
};