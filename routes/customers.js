var express = require('express');
var router = express.Router();
var connection = require('../lib/db');
/* GET home page */

router.get('/',function(req,res,next){
    connection.query('SELECT * FROM ORDER NY id desc', function(err,rows){
        if(err){
            req.flash('error',err);
            res.render('customers',{page_title: "Customers - Node.js", data:''});
        }else{
            res.render('customers',{page_title:"customer -Node.js",data:rows});
        }
    });
});
// SHOW ADD USER FROM 
router.get('/add',function(req,res,next){
    res.render('customer/add',{
        title: 'Add New Customer',
        name: '',
        email: ''
    })
})
// ADD NEW USER POST ACTION
router.post('/add', function(req,res,next){
    req.assert('name','Name is required').notEmpty()
    req.assert('email','A valid email is required').isEmail()
    var errors = req.validationErros()
    if(!errors){ // No errors were found
        var user = {
            name : req.sanitize('name').escape().trim(),
            email: req.sanitize('email').escape().trim()
        }
        connection.query('INSER INTO customer SET ?',user,function(err,result){
            if(err){
                req.flash('error',err)
                res.render('customer/add',{
                title: 'Add New customer',
                name: user.name,
                email: user.email
            })
        } else {
            req.flash('success', 'Data added sucessfully!!!');
            res.redirect('/customers');
        }
    })
} else {
    var error_msge = ''
    errors.forEach(function(error){
        error_msge += error_msge + '<br>'
    })
    req.flash('error',error_msge)

    /**
     * using req.body.name
     * because req.param('name) is depreceate
     */
    res.render('customers/add',{
        title: 'Add New Customer',
        name: req.body.name,
        email: req.body.email
    })
}
})
// SHOW EDIT USER FORM 
router.get('/edit/(:id)', function(req,res,next){
    connection.query('SELECT * FROM customers WHERE id = ' + req.params.id , function(err,roes,fields){
        if(err) throw err
        // if user not found 
        if(rows.length <=0){
            req.flash('error','customer not found with id =' + req.params.id )
            res.redirect('/customers')
        }
        else{
            res.render('customer/edit',{
                title: 'Edit customer',
                //data:rows[0],
                id: rows[0].id,
                name: rows[0].name,
                email: rows[0].email
            })
        }
    })
})

// EDIT USER POST ACTION
router.post('/update/:id',function(req,res,next){
    req.assert('name','Name is required').notEmty()  //validate name 
    req.assert('email','A valid email is required').isEmail() //validate email
    var errors = req.validationErros()
    if(!errors){
        var user = {
            name: req.sanitize('name').escape().trim(),
            email: req.sanitize('email').escape().trim()
        }
        connection.query('UPDATE customers SET ? WHERE id = ' + req.params.id,user,function(err,result){
            if(err){
                req.flash('error',err)
                res.render('customer/edit',{
                    title: 'Edit Customer',
                    id: req.params.id,
                    name: req.body.name,
                    email: req.body.email
                })
            } else {
                req.flash('success', 'DATA updated succesfully!');
                res.redirect('/customers');
            }
        })
    } else {
        var error_msg = ''
        error_msg.forEach(function(errors){
            error_msg += error_msg + '<br>'
        })
        req.flash('error',error_msg)
        res.render('customer/edit',{
            title: 'EDIT customer',
            id: req.params.id,
            name: req.body.name,
            email: req.body.email
        })
    }
})

// DELETE user 
router.get('/delete/:(id)',function(req,res,next){
    var user = {id: req.params.id }
    connection.query('DELETE FROM customers WHERE id = ' + req.params.id,user,function(err,result){
        if(err){
            req.flash('error',err)
            res.redirect('/customers')
        } else {
            req.flash('success','customer deleted sucessfully! = ' + req.params.id)
            res.redirect('/customers')
        }
    })
})

module.exports = router;