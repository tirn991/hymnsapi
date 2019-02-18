'use strict'
var Song = require('../models/song.model');
module.exports = {
    getAllSongs: function(req, res) {
        Song.find({}, function(error, song) {
            //console.log(song);
            if (error) { res.status(500).json({ success: false, message: error.message }); return; };
            if (song.length == 0) { res.status(404).json({ success: false, message: "Song Collection is Empty" }).end(); return; };
            if (song.length != 0) { res.status(200).json(song).end(); return; };
        });
    },

    removeAllSong: function(req, res) {
        Song.remove({}, function(error, result) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            res.json({ success: true, message: "All Song Removed in Collection" });
        });
    },
    createSong: function(req, res) {
        var song = new Song(req.swagger.params.songdata.value);
        console.log(song);
        song.save(function(error, song) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return; }
            if (song != null) { res.status(201).json(song).end(); return; };
        });
    },
    getSingleSong: function(req, res) {
        Song.findById(req.swagger.params.songid.value, function(error, song) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (song == null) { res.status(404).json({ success: false, message: "Song not Found" }).end(); return; };
            if (song != null) { res.status(200).json(song).end(); return; };
        });
    },
    getSongBylanguage: function(req, res) {
        Song.find({ "songlanguage": req.swagger.params.songlanguage.value }, function(error, songs) {
            console.log(songs);
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (songs.length == 0) { res.status(404).json({ success: false, message: "Songs not Found" }).end(); return; };
            if (songs.length != 0) { res.status(200).json(songs).end(); return; };
        });
    },

    removeSingleSong: function(req, res) {
        Song.findByIdAndRemove(req.swagger.params.songid.value, function(error, message) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            res.json({ success: true, message: "Song Removed" });
        });
    },

    updateSingleSong: function(req, res) {
        var song = new Song(req.swagger.params.song.value);
        Song.findByIdAndUpdate(req.swagger.params.songid.value, song, { new: true }, function(error, updatedsong) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (updatedsong == null) { res.status(404).json({ success: false, message: "Song to be Updated not Found" }).end(); return; };
            if (updatedsong != null) { res.status(200).json(updatedsong).end(); return; };
        });
    }

};