const router = require('express').Router()
const Storage = require('../models/storageModel')
const Residence = require('../models/residentialModel')

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/plans', (req, res) => {
    res.render('plans')
})

router.get('/residents', (req, res) => {
    let residentsData = {}
    Storage.find({}, (err, residents) => {
        if (err) {
            res.json({
                message: 'Error',
                err
            })
        } else {
            residentsData['storage'] = residents
            Residence.find({}, (err, residents) => {
                if (err) {
                    res.json({
                        message: 'Error',
                        err
                    })
                } else {
                    residentsData['residence'] = residents
                    res.render('residents', {residentsData})
                }
            })
        }
    })
})

router.get('/:id', (req, res) => {
    if (req.params.id == 'residence') {
        res.render('residence')
    } else {
        res.render('storage')
    }
})

router.post('/storage', (req, res) => {
    Storage.create(req.body, (err, storage) => {
        if (err) {
            res.json({
                message: 'Error',
                err
            })
        } else {
            res.status(200).json({
                message: 'Success',
                data: storage
            })
        }
    })
})

router.post('/residence', (req, res) => {
    Residence.create(req.body, (err, residence) => {
        if (err) {
            res.json({
                message: 'Error',
                err
            })
        } else {
            res.status(200).json({
                message: 'Success',
                data: residence
            })
        }
    })
})

router.delete('/:id', (req, res) => {
    if (req.params.id == 'residence') {
        Residence.deleteOne({ firstname: req.body.firstname, surname: req.body.surname }, (err, user) => {
            if (err) {
                res.json({
                    message: 'Error',
                    err
                })
            } else {
                res.status(200).json({
                    message: 'Success',
                    user
               }) 
            }
        })
    } else {
        Storage.deleteOne({ firstname: req.body.firstname, surname: req.body.surname }, (err, user) => {
            if (err) {
                res.json({
                    message: 'Error',
                    err
                })
            } else {
                res.status(200).json({
                    message: 'Success',
                    user
               }) 
            }
        })
    }
})

module.exports = router