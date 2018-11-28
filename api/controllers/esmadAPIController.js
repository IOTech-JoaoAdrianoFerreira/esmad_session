'use strict';
var mongoose = require('mongoose'),
  Record = mongoose.model('Record');
var SerialPort = require("serialport");
var serialPort = null;

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

  if (serialPort != null) {
    serialPort.close();
  }

  setTimeout(function () {
    serialPort = new SerialPort('COM5', {
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
          res.json({ message: "Operation Sent" });
          serialPort.on('data', function (data) {
            console.log(data.toString());
            try {
              var new_record = new Record();
              new_record.value = data.toString();
              new_record.save();
            } catch { }
          });
          serialPort.write(action + "\n");
        }
      });
    } else {
      res.json({ message: 'Ivalid Values' });
    }
  }, 200);
};