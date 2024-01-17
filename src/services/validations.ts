import { z } from 'zod';
import moment from 'moment';

const signUpValidation = z.object({
    username: z.string().nonempty('username cannot be empty').min(3),
    email: z.string().email().nonempty(),
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    dob: z.string().nonempty('Fill in a vaild date'),
    password: z.string().nonempty(),
    confirmPassword: z.string().nonempty(),
    phone: z.number().min(10, 'Enter a valid phone number'),
}).refine(({ password, confirmPassword }) => {
    if (confirmPassword !== password) {
        return false
    } else {
        return true
    }
}, {
    message: 'password do not match',
    path: ['confirmPassword'],
})
.refine(({ dob }) => {
    const ageLimit = moment().subtract(18, 'years');
    if (moment(dob).isAfter(ageLimit)) {
        return false;
    } else {
        return true;
    }
}, {
    message: 'You must be upto 18 to register',
    path: ['dob']
})
.refine(({ username }) => {
    if (username.includes(' ')) {
        return false;
    } else {
        return true;
    }
}, {
    message: 'Username cannot contain spaces',
    path: ['username'],
})

const signInValidation = z.object({
    username: z.string().nonempty('username cannot be empty').min(3, 'must contain at least 3 characters'),
    password: z.string().nonempty('Password cannot be empty'),
})

const personinforSchema = z.object({
    // email: z.string().nonempty().email(),
    phone: z.string().nonempty().min(11),
    gender: z.string().nonempty(),
    dob: z.string().nonempty(),
});

const reportSchema = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
});

const forgotPasswordEmailValidation = z.object({
    email: z.string().nonempty().email(),
});

const resetValidation = z.object({
    password: z.string().nonempty(),
    confirmPassword: z.string().nonempty(),
}).refine(({ password, confirmPassword }) => {
    if (confirmPassword !== password) {
        return false
    } else {
        return true
    }
}, {
    message: 'password do not match',
    path: ['confirmPassword'],
});

const communitySchema = z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
})

const groupChatSchema = z.object({
    name: z.string().nonempty(),
})

const editProfileSchema = z.object({
    firstName: z.string().nonempty("Your firstname is required").min(3),
    lastName: z.string().nonempty("Your lastname is required").min(3),
    username: z.string().nonempty("Your username cannot be blank").min(3),
    website: z.string().min(0),
    aboutme: z.string().min(0),
});

const editPersonalInfoSchema = z.object({
    mobilePhone: z.string().min(10),
    gender: z.string().nonempty("Your gender is require"),
    dob: z.string().nonempty(),
    email: z.string(),
});

const changePasswordSchema = z.object({
    oldPassword: z.string().min(5),
    newPassword: z.string().min(8),
    confirmPassword: z.string(),
}).refine(({ newPassword, confirmPassword }) => {
    if (confirmPassword !== newPassword) {
        return false
    } else {
        return true
    }
}, {
    message: 'password do not match',
    path: ['confirmPassword'],
});

export {
    signUpValidation,
    signInValidation,
    personinforSchema,
    reportSchema,
    forgotPasswordEmailValidation,
    resetValidation,
    communitySchema,
    groupChatSchema,
    editProfileSchema,
    editPersonalInfoSchema,
    changePasswordSchema
}