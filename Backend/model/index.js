let dataBase = require('../config');

let {hash, 
    compare, 
    hashSync
} = require('bcrypt');

let {createToken} = require('../middleware/authenticatedUser');

class User {
    login(req, res) {
        const {emailAdd, password} = req.body;
        const strQry = `SELECT userID, firstName, lastName, 
        emailAdd, userPass, gender, userRole, 
        userProfile FROM Users WHERE emailAdd = ${emailAdd};`;



        dataBase.query(strQry, async (err, data) => {
            if (err) throw err;
            if (!data || data == null) {
                res.status(404).json({ err: `You've entered an invalid email address`});
            } else {
                await compare(userPass, data[0].userPass, (cErr, cResult) => {
                    const jwToken = createToken({
                        emailAdd,
                        userPass,
                    });
                    res.cookie('authenticUser', jwToken, {
                        maxAge: 4000000,
                        httpOnly: true,
                    });
                    if (cResult) {
                        res.status(200).json({
                            msg: 'Logged in successfully',
                            jwToken,
                            result: data[0],
                        });
                    } else {
                        res.status(401).json({
                            err: `Sorry, the password you've entered is not valid.`,
                        });
                    }
                });
            }
        });
    }

    fetchUsers(req, res) {
        const strQry = `SELECT userID, firstName, lastName, 
        emailAdd, gender, userRole, userProfile FROM Users;`;
        dataBase.query(strQry, (err, data) => {
            if (err) throw err ,console.log(err);
            
            else res.status(200).json({ result: data });
        });
    }
    fetchUser(req, res) {
        const strQry = `SELECT
        userID, firstName, lastName, emailAdd, 
        gender, userRole, userProfile 
        FROM Users WHERE userID = ?;`;
        dataBase.query(strQry, [req.params.id], (err, data) => {
            if (err) throw err;
            else res.status(200).json({ result: data });
        });
    }
    addUser(req, res) {
        const Users = req.body;
        const strQry = 
        `INSERT INTO Users SET ?;
        `;
        dataBase.query(strQry, Users,
            (err) => {
                if (err){
                    console.log(err);
                    res.status(400).json({ err: `Sorry, something went wrong.` });
                }else{
                    res.status(200).json({ msg: `User added successfully` });
                }
            }
        );
    }
    deleteUser(req, res) {
        const strQry = 
        `DELETE FROM Users WHERE userID = ?;`;
        dataBase.query(strQry,[req.params.id], (err)=> {
            if(err) console.log(err), res.status(400).json({err: 'Could not delete user.'}) ;
            res.status(200).json({msg: 'A user was deleted.'});
        })
    }
};

class Product {
    fetchProducts(req, res) {
        const strQry = `SELECT *
        FROM Products;`;
        dataBase.query(strQry, (err, results)=> {
            if(err) throw err;
            res.status(200).json({results: results})
        });
    }
    fetchProduct(req, res) {
        const strQry = `SELECT * From Products  WHERE id = ?;`;
        dataBase.query(strQry, [req.params.id], (err, results)=> {
            if(err) throw err;
            res.status(200).json({results: results})
        });
  
    }
    addProduct(req, res) {
        const product = req.body
        const strQry = 
        `INSERT INTO Products SET ?;
        `;
        dataBase.query(strQry,product,
            (err)=> {
                if(err){
                    console.log(err);
                    res.status(400).json({err: 'Unable to insert a new record.'});
                }else {
                    res.status(200).json({msg: 'Product saved!'});
                }
            }
        );    
  
    }
    updateProduct(req, res) {
        const strQry = 
        `UPDATE Products SET ? WHERE id = ?`;
        dataBase.query(strQry,[req.body, req.params.id],
            (err)=> {
                if(err){
                    res.status(400).json({err: 'Unable to update a record.'});
                }else {
                    res.status(200).json({msg: 'Product updated!'});
                }
            }
        );    
  
    }
    deleteProduct(req, res) {
        const strQry = 
        `DELETE FROM Products WHERE id = ?;`;
        dataBase.query(strQry,[req.params.id], (err)=> {
            if(err) res.status(400).json({err: 'The record was not found.'});
            res.status(200).json({msg: 'A product was deleted.'});
        })
    }
  
  };


  module.exports = {
    User, 
    Product
  }