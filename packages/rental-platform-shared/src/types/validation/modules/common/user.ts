import * as Yup from 'yup'
import { TYPES } from '../../../..'

const initialUser: TYPES.MODELS.COMMON.USERS.IUpdateUserInfo = {
  name: '',
  firstName: '',
  email: '',
  newPassword: undefined,
  enabled2MFA: false,
  keycloakId: '',
  preferredLanguage: [''],
}

const userValidationSchema = Yup.object().shape({
  name: Yup.string().max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  firstName: Yup.string().max(100, 'Le prénom ne peut pas dépasser 100 caractères'),
  email: Yup.string().email('Email invalide').required("L'email est requis"),
  newPassword: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  enabled2MFA: Yup.boolean(),
  preferredLanguage: Yup.array().of(Yup.string()),
})

export { initialUser, userValidationSchema }
