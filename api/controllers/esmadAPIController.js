'use strict';
var mongoose = require('mongoose'),
  Record = mongoose.model('Record');

exports.list_all_records = function (req, res) {
  Record.find({}, function (err, record) {
    if (err)
      res.send(err);
    res.json(record);
  });
};

exports.create_record = function (req, res) {
  var new_record = new Record(req.body);
  new_record.save(function (err, record) {
    if (err)
      res.send(err);
    res.json(record);
  });
};

exports.list_record = function (req, res) {
  Record.findById(req.params.recordId, function (err, record) {
    if (err)
      res.send(err);
    res.json(record);
  });
};

exports.update_record = function (req, res) {
  Record.findOneAndUpdate({ _id: req.params.recordId }, req.body, { new: true }, function (err, record) {
    if (err)
      res.send(err);
    res.json(record);
  });
};

exports.delete_record = function (req, res) {
  Record.remove({
    _id: req.params.recordId
  }, function (err, record) {
    if (err)
      res.send(err);
    res.json({ message: 'Record successfully deleted' });
  });
};

exports.start_stop = function (req, res) {

  var action = req.body.action;
  var SerialPort = require("serialport")

  var serialPort = new SerialPort('COM5', {
    autoOpen: false,
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1
  });

  if (action == "0" || action == "1") {
    serialPort.open(function (error) {
      if (error) {
        console.log('failed to open: ' + error);
      } else {
        console.log('serial port opened');
        serialPort.on('data', function (data) {
          res.json({ message: data.toString('utf8') });
          serialPort.close();
        });
        serialPort.write(action + "\n");
      }
    });
  } else {
    res.json({ message: 'Ivalid Values' });
  }
};
