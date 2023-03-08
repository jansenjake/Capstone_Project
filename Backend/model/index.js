let dataBase = require('../config');

let {hash, 
    compare, 
    hashSync
} = require('bcrypt');

let {createToken} = require('../middleware/authenticatedUser');

class User {
    login(req, res) {
        const {emailAddress, password} = req.body;
        const strQry = `SELECT userID, firstName, lastName, 
        emailAddress, userPass, gender, userRole, 
        userProfile FROM Users WHERE emailAddress = ${emailAddress};`;

        dataBase.query(strQry, async (err, data) => {
            if (err) throw err;
            if (!data || data == null) {
                res.status(404).json({ err: `You've entered an invalid email address`});
            } else {
                await compare(userPass, data[0].userPass, (cErr, cResult) => {
                    const jwToken = createToken({
                        emailAddress,
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
        emailAddress, gender, userRole, userProfile FROM Users;`;
        dataBase.query(strQry, (err, data) => {
            if (err) throw err;
            else res.status(200).json({ result: data });
        });
    }
    fetchUser(req, res) {
        const strQry = `SELECT
        userID, firstName, lastName, emailAddress, 
        gender, userRole, userProfile 
        FROM Users WHERE userID = ?;`;
        dataBase.query(strQry, [req.params.id], (err, data) => {
            if (err) throw err;
            else res.status(200).json({ result: data });
        });
    }
};

class Product {
    fetchProducts(req, res) {
        const strQry = `SELECT id, prodName, prodDescription, category, price, prodQuantity, imgURL
        FROM Products;`;
        dataBase.query(strQry, (err, results)=> {
            if(err) throw err;
            res.status(200).json({results: results})
        });
    }
    fetchProduct(req, res) {
        const strQry = `SELECT id, prodName, 
        prodDescription, category, 
        price, prodQuantity, imgURL
        FROM products
        WHERE id = ?;`;
        dataBase.query(strQry, [req.params.id], (err, results)=> {
            if(err) throw err;
            res.status(200).json({results: results})
        });
  
    }
    addProduct(req, res) {
        const strQry = 
        `INSERT INTO Products SET ?;
        `;
        dataBase.query(strQry,[req.body],
            (err)=> {
                if(err){
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