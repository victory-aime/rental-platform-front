import * as Constants from './constants'
import { parcsServiceInstance } from './parc.service-instance'
import { TYPES } from 'rental-platform-shared'
import { AxiosError } from 'axios'

const getParcsQueries = (args: TYPES.QUERIES.QueryPayload<TYPES.MODELS.CARS.ParcListDto, any>) => {
  const { payload, queryOptions } = args
  return TYPES.QUERIES.useCustomQuery<TYPES.MODELS.CARS.IResponseParc, AxiosError>({
    queryKey: [Constants.PARCS_KEYS.ALL_PARCS],
    queryFn: () => parcsServiceInstance().fetchParcs(payload),
    options: queryOptions,
  })
}

const createParcMutation = (args: TYPES.QUERIES.MutationPayload<TYPES.MODELS.CARS.ParcDto>) => {
  return TYPES.QUERIES.useCustomMutation<TYPES.MODELS.CARS.ParcDto, any, AxiosError>({
    mutationKey: [Constants.PARCS_KEYS.ADD_PARC],
    mutationFn: (data) => parcsServiceInstance().createParc(data),
    options: args,
  })
}

const updateParcMutation = (args: TYPES.QUERIES.MutationPayload<TYPES.MODELS.CARS.ParcDto>) => {
  return TYPES.QUERIES.useCustomMutation<TYPES.MODELS.CARS.ParcDto, any, AxiosError>({
    mutationKey: [Constants.PARCS_KEYS.UPDATE_PARC],
    mutationFn: (data) => parcsServiceInstance().updateParc(data),
    options: args,
  })
}

const deleteParcMutation = (args: TYPES.QUERIES.MutationPayload<TYPES.MODELS.CARS.ParcDto>) => {
  return TYPES.QUERIES.useCustomMutation<TYPES.MODELS.CARS.ParcDto, any, AxiosError>({
    mutationKey: [Constants.PARCS_KEYS.DELETE_PARC],
    mutationFn: (data) => parcsServiceInstance().deleteParc(data),
    options: args,
  })
}

export { getParcsQueries, createParcMutation, deleteParcMutation, updateParcMutation }
