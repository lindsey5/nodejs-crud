const DataTypes = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

const User = sequelize.define('Users', {
    username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'Username cannot be empty.'
            },
            len: {
                args: [8, 20],
                msg: 'Username must be between 8 and 20 characters long.'
            }
            
        }
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false, // Ensure password cannot be null
        validate: {
            notEmpty: {
                msg: 'Password cannot be empty.' // Custom message for empty string validation
            },
            minLength(value) {
                if (value.length < 8) {
                    throw new Error('Password must be at least 8 characters long.');
                }
            },
            maxLength(value) {
                if (value.length > 20) {
                    throw new Error('Password cannot be more than 20 characters long.');
                }
            }
        }
    }
}, {
    timestamps: false,
    hooks: {
        beforeCreate: async (user, options) => {
            // Log before creating and saving the user
            console.log('User about to be created & saved:', user);

            // Hash the password before saving
            if (user.password) {
                const salt = await bcrypt.genSalt();
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user, options) => {
            // Log before updating and saving the user
            console.log('User about to be updated & saved:', user);

            // Hash the password before updating
            if (user.password) {
                user.password = await bcrypt.hash(user.password, salt);
            }
        },

        afterCreate: async (user, options) => {
            console.log('new user was created & saved', user);
        },

        afterUpdate: async (user, options) => {
            console.log('User was updated:', user);
        }
    }
});

User.login = async function (username, password) {
    const user = await this.findOne({ 
        where: { username }
    });
    
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
        return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect username');
    
}

module.exports = User;