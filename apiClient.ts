
import {network} from "./network"
    
export const healthCheck_health_check_get = ( ) =>
        network(`/health-check` , "GET" )
                 
                 
export const GetAllUsers_user_me_get = ( ) =>
        network(`/user/me` , "GET" )
                 
                 
export const getPhone_user_get_phone_post = ( data: { phone: string }) =>
        network(`/user/get-phone` , "POST" ,data)
                 
                 
export const checkVeryfiCode_user_check_veryfi_code_post = ( data: { phone: string; code: string }) =>
        network(`/user/check-veryfi-code` , "POST" ,data)
                 
                 
export const editProfile_user_edit_profile_put = ( data: { full_name: string; gender: string; state: string; city: string; addres: string; age: number; wage: number }) =>
        network(`/user/edit-profile` , "PUT" ,data)
                 
                 
export const activeApplicationPassword_user_active_app_password_patch = ( data: { password: string; repassword: string; oldpasword: string }) =>
        network(`/user/active-app-password` , "PATCH" ,data)
                 
                 
export const send_gym_info_gym_me_get = ( ) =>
        network(`/gym/me` , "GET" )
                 
                 
export const get_user_by_phone_gym_user_by_phone__phone__get = (phone: string, ) =>
        network(`/gym/user-by-phone/${phone}` , "GET" )
                 
                 
export const get_gym_equipments_gym_get_equipments__gym_id__get = (gym_id: string, ) =>
        network(`/gym/get-equipments/${gym_id}` , "GET" )
                 
                 
export const get_equipment_instance_gym_get_equipments_instance_get = ( ) =>
        network(`/gym/get-equipments-instance` , "GET" )
                 
                 
export const get_equipment_by_id_gym_get_equipment__eq_id__get = (eq_id: string, ) =>
        network(`/gym/get-equipment/${eq_id}` , "GET" )
                 
                 
export const edit_gym_info_gym_edit_info_put = ( data: { name: string; addres: string; owner_name: string; price: number; landlinephone: string }) =>
        network(`/gym/edit-info` , "PUT" ,data)
                 
                 
export const check_owner_phone_gym_create_verify_code_post = ( data: { phone: string }) =>
        network(`/gym/create-verify-code` , "POST" ,data)
                 
                 
export const verify_owner_phone_gym_verify_owner_post = ( data: { phone: string; verifyCode: string }) =>
        network(`/gym/verify-owner` , "POST" ,data)
                 
                 
export const add_equipment_gym_add_equipment_post = ( data: { id: number | string }) =>
        network(`/gym/add-equipment` , "POST" ,data)
                 
                 
export const handle_join_request_gym_join_request_post = ( data: { gym_id: string }) =>
        network(`/gym/join-request` , "POST" ,data)
                 
                 
export const read_file_files_get_file__digitalName__get = (digitalName: string, ) =>
        network(`/files/get-file/${digitalName}` , "GET" )
                 
                 
export const add_equipment_pic_files_add_equipment_instance_pic__equipment_instance_id__put = (equipment_instance_id: string, data: any) =>
        network(`/files/add-equipment-instance-pic/${equipment_instance_id}` , "PUT" ,data)
                 
                 
export const add_equip_pic_files_add_equipment_pic__equipment_id__put = (equipment_id: string, data: any) =>
        network(`/files/add-equipment-pic/${equipment_id}` , "PUT" ,data)
                 
                 
export const add_file_router_files_add_profile_post = ( data: any) =>
        network(`/files/add-profile` , "POST" ,data)
                 
                 
export const add_banner_file_files_add_banner_post = ( data: any) =>
        network(`/files/add-banner` , "POST" ,data)
                 
                 
export const open_sse_connection_sse_notif_gyms_open_get = ( ) =>
        network(`/sse-notif-gyms/open` , "GET" )
                 
                 
export const add_equipments_admins_add_equipment_post = ( data: { name: string; discription: string }) =>
        network(`/admins/add-equipment` , "POST" ,data)
                 
                 