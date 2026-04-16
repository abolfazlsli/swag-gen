
import {network} from "./network"
    
export const root__get = ( ) =>
        network(`/` , "GET" )
                 
                 
export const search_search_get = ( ) =>
        network(`/search` , "GET" )
                 
                 
export const info_number_info_number_get = ( ) =>
        network(`/info/number` , "GET" )
                 
                 
export const info_last_instructors_info_last_instructors_get = ( ) =>
        network(`/info/last/instructors` , "GET" )
                 
                 
export const info_top_instructors_info_top_instructors_get = ( ) =>
        network(`/info/top/instructors` , "GET" )
                 
                 
export const subscriber_subscriber_post = ( data) =>
        network(`/subscriber` , "POST" ,data)
                 
                 
export const healthcheck_healthcheck_get = ( ) =>
        network(`/healthcheck` , "GET" )
                 
                 
export const login_for_access_token_token_post = ( data) =>
        network(`/token` , "POST" ,data)
                 
                 
export const signup_signup_post = ( data) =>
        network(`/signup` , "POST" ,data)
                 
                 
export const Send_SMS_OTP_Send_SMS_OTP_post = ( data) =>
        network(`/Send_SMS_OTP` , "POST" ,data)
                 
                 
export const Confirm_OTP_Login_Confirm_OTP_Login_post = ( data) =>
        network(`/Confirm_OTP_Login` , "POST" ,data)
                 
                 
export const category_category_get = ( ) =>
        network(`/category` , "GET" )
                 
                 
export const sub_category_sub_category_get = ( ) =>
        network(`/sub_category` , "GET" )
                 
                 
export const get_instructors_instructors_get = ( ) =>
        network(`/instructors` , "GET" )
                 
                 
export const get_instructor_instructor__instructor_id___get = (instructor_id, ) =>
        network(`/instructor/${instructor_id}/` , "GET" )
                 
                 
export const courses_courses_get = ( ) =>
        network(`/courses` , "GET" )
                 
                 
export const courses_price_courses_price_get = ( ) =>
        network(`/courses/price` , "GET" )
                 
                 
export const courses_city_courses_city_get = ( ) =>
        network(`/courses/city` , "GET" )
                 
                 
export const courses_last_courses_last_get = ( ) =>
        network(`/courses/last` , "GET" )
                 
                 
export const courses_expensive_courses_expensive_get = ( ) =>
        network(`/courses/expensive` , "GET" )
                 
                 
export const get_courses_type_courses_type__courses_type__get = (courses_type, ) =>
        network(`/courses/type/${courses_type}` , "GET" )
                 
                 
export const get_courses_event_date_courses_event_date__courses_event_date__get = (courses_event_date, ) =>
        network(`/courses/event_date/${courses_event_date}` , "GET" )
                 
                 
export const get_courses_category_courses_category__category_id__get = (category_id, ) =>
        network(`/courses/category/${category_id}` , "GET" )
                 
                 
export const get_courses_sub_category_courses_sub_category__sub_category_id__get = (sub_category_id, ) =>
        network(`/courses/sub_category/${sub_category_id}` , "GET" )
                 
                 
export const course_details_courses__course_id___get = (course_id, ) =>
        network(`/courses/${course_id}/` , "GET" )
                 
                 
export const get_courses_instructor_courses_instructor__instructor_id___get = (instructor_id, ) =>
        network(`/courses/instructor/${instructor_id}/` , "GET" )
                 
                 
export const courses_chapter_courses_chapter__course_id___get = (course_id, ) =>
        network(`/courses/chapter/${course_id}/` , "GET" )
                 
                 
export const courses_lesson_get_courses_lesson__course_id___chapter_id___get = (course_id,chapter_id, ) =>
        network(`/courses/lesson/${course_id}/${chapter_id}/` , "GET" )
                 
                 
export const courses_get_lesson_courses_get_lesson__lesson_id__get = (lesson_id, ) =>
        network(`/courses/get/lesson/${lesson_id}` , "GET" )
                 
                 
export const course_discount_courses_discount_get = ( ) =>
        network(`/courses/discount` , "GET" )
                 
                 
export const course_filter_course_filter_post = ( data) =>
        network(`/course/filter` , "POST" ,data)
                 
                 
export const payment_payment_post = ( data) =>
        network(`/payment` , "POST" ,data)
                 
                 
export const payment_verify_payment_verify_post = ( data) =>
        network(`/payment/verify` , "POST" ,data)
                 
                 
export const carts_cart_get = ( ) =>
        network(`/cart` , "GET" )
                 
                 
export const cart_add_cart_add_post = ( data) =>
        network(`/cart/add` , "POST" ,data)
                 
                 
export const cart_delete_cart_delete_delete = ( ) =>
        network(`/cart/delete` , "DELETE" )
                 
                 
export const discount_discount_post = ( data) =>
        network(`/discount` , "POST" ,data)
                 
                 
export const chat_chat_get = ( ) =>
        network(`/chat` , "GET" )
                 
                 
export const chat_add_chat_add_post = ( data) =>
        network(`/chat/add` , "POST" ,data)
                 
                 
export const admin_users_admin_users_get = ( ) =>
        network(`/admin/users` , "GET" )
                 
                 
export const admin_users_delete_admin_users_delete_delete = ( ) =>
        network(`/admin/users/delete` , "DELETE" )
                 
                 
export const admin_add_users_instructor_admin_add_users_instructor__user_id__post = (user_id, data) =>
        network(`/admin/add/users/instructor/${user_id}` , "POST" ,data)
                 
                 
export const admin_users_customer_cart_admin_users_customer_cart__user_id__get = (user_id, ) =>
        network(`/admin/users/customer_cart/${user_id}` , "GET" )
                 
                 
export const admin_subscriber_admin_subscriber_get = ( ) =>
        network(`/admin/subscriber` , "GET" )
                 
                 
export const admin_instructors_admin_instructors_get = ( ) =>
        network(`/admin/instructors` , "GET" )
                 
                 
export const admin_instructors_add_verification_status_admin_instructors_add_verification_status__user_id__post = (user_id, data) =>
        network(`/admin/instructors/add/verification_status/${user_id}` , "POST" ,data)
                 
                 
export const admin_instructors_add_is_best_admin_instructors_add_is_best__user_id__post = (user_id, data) =>
        network(`/admin/instructors/add/is_best/${user_id}` , "POST" ,data)
                 
                 
export const admin_instructors_remove_is_best_admin_instructors_remove_is_best__user_id__post = (user_id, data) =>
        network(`/admin/instructors/remove/is_best/${user_id}` , "POST" ,data)
                 
                 
export const admin_categories_admin_categories_get = ( ) =>
        network(`/admin/categories` , "GET" )
                 
                 
export const admin_categories_add_category_admin_categories_add_category_post = ( data) =>
        network(`/admin/categories/add_category` , "POST" ,data)
                 
                 
export const admin_categories_delete_category_admin_categories_delete_category__category_id__delete = (category_id, ) =>
        network(`/admin/categories/delete_category/${category_id}` , "DELETE" )
                 
                 
export const admin_sub_categories_admin_sub_categories_get = ( ) =>
        network(`/admin/sub_categories` , "GET" )
                 
                 
export const admin_categories_add_sub_category_admin_categories_add_sub_category_post = ( data) =>
        network(`/admin/categories/add_sub_category` , "POST" ,data)
                 
                 
export const admin_categories_delete_sub_category_admin_categories_delete_sub_category__sub_category_id__delete = (sub_category_id, ) =>
        network(`/admin/categories/delete_sub_category/${sub_category_id}` , "DELETE" )
                 
                 
export const admin_tag_admin_tag_get = ( ) =>
        network(`/admin/tag` , "GET" )
                 
                 
export const admin_tag_add_admin_tag_add_post = ( data) =>
        network(`/admin/tag/add` , "POST" ,data)
                 
                 
export const admin_tag_delete_admin_tag_delete__tag_id__delete = (tag_id, ) =>
        network(`/admin/tag/delete/${tag_id}` , "DELETE" )
                 
                 
export const admin_courses_admin_courses_get = ( ) =>
        network(`/admin/courses` , "GET" )
                 
                 
export const admin_courses_delete_admin_courses_delete__courses_id__delete = (courses_id, ) =>
        network(`/admin/courses/delete/${courses_id}` , "DELETE" )
                 
                 
export const admin_courses_confirm_admin_courses_confirm__courses_id__post = (courses_id, data) =>
        network(`/admin/courses/confirm/${courses_id}` , "POST" ,data)
                 
                 
export const admin_courses_reject_admin_courses_reject__courses_id__post = (courses_id, data) =>
        network(`/admin/courses/reject/${courses_id}` , "POST" ,data)
                 
                 
export const admin_comments_admin_comments_get = ( ) =>
        network(`/admin/comments` , "GET" )
                 
                 
export const admin_comments_delete_admin_comments_delete__comments_id__delete = (comments_id, ) =>
        network(`/admin/comments/delete/${comments_id}` , "DELETE" )
                 
                 
export const admin_comments_confirm_admin_comments_confirm__comments_id__post = (comments_id, data) =>
        network(`/admin/comments/confirm/${comments_id}` , "POST" ,data)
                 
                 
export const admin_comments_reject_admin_comments_reject__comments_id__post = (comments_id, data) =>
        network(`/admin/comments/reject/${comments_id}` , "POST" ,data)
                 
                 
export const admin_system_message_admin_system_message_get = ( ) =>
        network(`/admin/system_message` , "GET" )
                 
                 
export const admin_system_messages_add_admin_system_messages_add_post = ( data) =>
        network(`/admin/system_messages/add` , "POST" ,data)
                 
                 
export const admin_system_messages_delete_admin_system_messages_delete__system_messages_id__delete = (system_messages_id, ) =>
        network(`/admin/system_messages/delete/${system_messages_id}` , "DELETE" )
                 
                 
export const admin_system_messages_direct_admin_system_messages_direct_get = ( ) =>
        network(`/admin/system_messages_direct` , "GET" )
                 
                 
export const admin_discounts_admin_discounts_get = ( ) =>
        network(`/admin/discounts` , "GET" )
                 
                 
export const admin_discounts_add_admin_discounts_add_post = ( data) =>
        network(`/admin/discounts/add` , "POST" ,data)
                 
                 
export const admin_discounts_delete_admin_discounts_delete__discounts_id__delete = (discounts_id, ) =>
        network(`/admin/discounts/delete/${discounts_id}` , "DELETE" )
                 
                 
export const admin_transactions_admin_transactions_get = ( ) =>
        network(`/admin/transactions` , "GET" )
                 
                 
export const admin_withdrawal_admin_withdrawal_get = ( ) =>
        network(`/admin/withdrawal` , "GET" )
                 
                 
export const admin_cart_transactions_admin_cart_transactions_get = ( ) =>
        network(`/admin/cart/transactions` , "GET" )
                 
                 
export const instructor_dashboard_instructor_dashboard_get = ( ) =>
        network(`/instructor/dashboard` , "GET" )
                 
                 
export const instructor_profile_instructor_profile_get = ( ) =>
        network(`/instructor/profile` , "GET" )
                 
                 
export const instructor_profile_edit_instructor_profile_edit_put = ( data) =>
        network(`/instructor/profile/edit` , "PUT" ,data)
                 
                 
export const instructor_profile_edit_add_image_instructor_profile_edit_add_image_post = ( data) =>
        network(`/instructor/profile/edit/add/image` , "POST" ,data)
                 
                 
export const instructor_system_message_instructor_system_message_get = ( ) =>
        network(`/instructor/system_message` , "GET" )
                 
                 
export const instructor_comments_message_instructor_comments_message_get = ( ) =>
        network(`/instructor/comments_message` , "GET" )
                 
                 
export const instructor_tag_instructor_tag_get = ( ) =>
        network(`/instructor/tag` , "GET" )
                 
                 
export const instructor_add_tag_instructor_add_tag_post = ( data) =>
        network(`/instructor/add/tag` , "POST" ,data)
                 
                 
export const instructor_courses_instructor_courses_get = ( ) =>
        network(`/instructor/courses` , "GET" )
                 
                 
export const instructor_courses_details_instructor_courses__course_id___get = (course_id, ) =>
        network(`/instructor/courses/${course_id}/` , "GET" )
                 
                 
export const instructor_courses_delete_instructor_courses_delete_delete = ( ) =>
        network(`/instructor/courses/delete` , "DELETE" )
                 
                 
export const instructor_courses_add_instructor_courses_add_post = ( data) =>
        network(`/instructor/courses/add` , "POST" ,data)
                 
                 
export const instructor_courses_edit_instructor_courses_edit__course_id__put = (course_id, data) =>
        network(`/instructor/courses/edit/${course_id}` , "PUT" ,data)
                 
                 
export const instructor_course_instructor_courses__course_id__get = (course_id, ) =>
        network(`/instructor/courses/${course_id}` , "GET" )
                 
                 
export const instructor_chapter_instructor_chapter__course_id___get = (course_id, ) =>
        network(`/instructor/chapter/${course_id}/` , "GET" )
                 
                 
export const instructor_add_chapter_instructor_add_chapter__course_id___post = (course_id, data) =>
        network(`/instructor/add/chapter/${course_id}/` , "POST" ,data)
                 
                 
export const instructor_edit_chapter_instructor_edit_chapter__chapter_id___put = (chapter_id, data) =>
        network(`/instructor/edit/chapter/${chapter_id}/` , "PUT" ,data)
                 
                 
export const instructor_delete_chapter_instructor_delete_chapter__chapter_id___delete = (chapter_id, ) =>
        network(`/instructor/delete/chapter/${chapter_id}/` , "DELETE" )
                 
                 
export const instructor_lesson_get_instructor_lesson_get__course_id___chapter_id___get = (course_id,chapter_id, ) =>
        network(`/instructor/lesson/get/${course_id}/${chapter_id}/` , "GET" )
                 
                 
export const instructor_get_lesson_instructor_get_lesson__lesson_id__get = (lesson_id, ) =>
        network(`/instructor/get/lesson/${lesson_id}` , "GET" )
                 
                 
export const instructor_add_lesson_instructor_add_lesson__course_id___chapter_id___post = (course_id,chapter_id, data) =>
        network(`/instructor/add/lesson/${course_id}/${chapter_id}/` , "POST" ,data)
                 
                 
export const instructor_edit_lesson_instructor_edit_lesson__lesson_id__put = (lesson_id, data) =>
        network(`/instructor/edit/lesson/${lesson_id}` , "PUT" ,data)
                 
                 
export const instructor_delete_lesson_instructor_delete_lesson__lesson_id__delete = (lesson_id, ) =>
        network(`/instructor/delete/lesson/${lesson_id}` , "DELETE" )
                 
                 
export const instructor_add_exams_instructor_add_exams__course_id___chapter_id___post = (course_id,chapter_id, data) =>
        network(`/instructor/add/exams/${course_id}/${chapter_id}/` , "POST" ,data)
                 
                 
export const instructor_edit_exams_instructor_edit_exams__exams_id___put = (exams_id, data) =>
        network(`/instructor/edit/exams/${exams_id}/` , "PUT" ,data)
                 
                 
export const instructor_get_exams_instructor_get_exams__exams_id___get = (exams_id, ) =>
        network(`/instructor/get/exams/${exams_id}/` , "GET" )
                 
                 
export const instructor_lesson_instructor_lesson_get = ( ) =>
        network(`/instructor/lesson` , "GET" )
                 
                 
export const instructor_exams_instructor_exams_get = ( ) =>
        network(`/instructor/exams` , "GET" )
                 
                 
export const instructor_cart_transactions_instructor_cart_transactions_get = ( ) =>
        network(`/instructor/cart/transactions` , "GET" )
                 
                 
export const instructor_cart_pending_transactions_instructor_cart_pending_transactions_get = ( ) =>
        network(`/instructor/cart/pending/transactions` , "GET" )
                 
                 
export const instructor_transactions_instructor_transactions_get = ( ) =>
        network(`/instructor/transactions` , "GET" )
                 
                 
export const instructor_request_withdrawal_instructor_request_withdrawal_post = ( data) =>
        network(`/instructor/request/withdrawal` , "POST" ,data)
                 
                 
export const instructor_withdrawal_instructor_withdrawal_get = ( ) =>
        network(`/instructor/withdrawal` , "GET" )
                 
                 
export const student_profile_student_profile_get = ( ) =>
        network(`/student/profile` , "GET" )
                 
                 
export const student_profile_edit_student_profile_edit_put = ( data) =>
        network(`/student/profile/edit` , "PUT" ,data)
                 
                 
export const student_system_message_student_system_message_get = ( ) =>
        network(`/student/system_message` , "GET" )
                 
                 
export const student_transactions_student_transactions_get = ( ) =>
        network(`/student/transactions` , "GET" )
                 
                 
export const student_favorites_add_student_favorites_add_post = ( data) =>
        network(`/student/favorites/add` , "POST" ,data)
                 
                 
export const student_favorites_student_favorites_get = ( ) =>
        network(`/student/favorites` , "GET" )
                 
                 
export const student_tutorial_student_tutorial_get = ( ) =>
        network(`/student/tutorial` , "GET" )
                 
                 
export const student_suggestions_student_suggestions_get = ( ) =>
        network(`/student/suggestions` , "GET" )
                 
                 
export const student_purchased_student_purchased_courses_get = ( ) =>
        network(`/student/purchased/courses` , "GET" )
                 
                 
export const student_courses_details_student_courses__course_id___get = (course_id, ) =>
        network(`/student/courses/${course_id}/` , "GET" )
                 
                 
export const student_exams_student_exams__course_id___chapter_id__get = (course_id,chapter_id, ) =>
        network(`/student/exams/${course_id}/${chapter_id}` , "GET" )
                 
                 
export const student_tutorial_passed_student_tutorial_passed__tutorial_id___passed_percent__post = (tutorial_id,passed_percent, data) =>
        network(`/student/tutorial/passed/${tutorial_id}/${passed_percent}` , "POST" ,data)
                 
                 
export const student_comments_add_student_comments_add_post = ( data) =>
        network(`/student/comments/add` , "POST" ,data)
                 
                 
export const student_comments_student_comments_get = ( ) =>
        network(`/student/comments` , "GET" )
                 
                 
export const file_upload_file_upload_post = ( data) =>
        network(`/file/upload` , "POST" ,data)
                 
                 
export const media_upload_media_upload_post = ( data) =>
        network(`/media/upload` , "POST" ,data)
                 
                 
export const media_get_media_get__friendly_token__get = (friendly_token, ) =>
        network(`/media/get/${friendly_token}` , "GET" )
                 
                 
export const media_delete_media_delete_delete = ( ) =>
        network(`/media/delete` , "DELETE" )
                 
                 