(ns quizapp.handler
  (:require 
            [compojure.api.sweet :refer :all]
            [ring.util.http-response :refer :all]
          [quizapp.middleware :refer [wrap-cors]]
            [schema.core :as s]
            [quizapp.query :as q]
            [clojure.java.io :as io]
            (ring.middleware [multipart-params :as mp])
            [compojure.api.upload :as upload]))


;; accept everything


(def app 
  (api
    {:swagger
     {:ui "/"
      :spec "/swagger.json"
      :data {:info {:title "quizapp"
                    :description "Compojure Api example"}
             :tags [{:name "api", :description "some apis"}]}}}

    (context "/quizapp" []
      :tags ["quizapp"]
      
     (GET "/users" []
        (ok (q/get-users )))
      (GET "/users/:UserID" []
        :path-params [UserID :- s/Int]
        (ok (q/get-user UserID)))
      (POST "/add-user" []
        :body [user-body q/AddBody]
        (let [{:keys [email mcqmark descmark status]} user-body]
          (ok (q/add-user email mcqmark descmark status))))
      (PUT "/update-user" []
        :body [user-body q/UpdateBody]
        (let [{:keys [email descmark ]} user-body]
          (ok {:updated (q/update-user email descmark)})))
      (DELETE "/delete-user/:UserID" []
        :path-params [UserID :- s/Int]
        (ok {:deleted (q/delete-user UserID)}))
       (GET "/answers/:filepath" []
            :path-params [filepath]
        (ok (q/get-answers filepath )))
        (GET "/questions" []
          :path-params []
        (ok (q/get-question  )))

      
      (POST "/file" []
        :multipart-params [foo :- s/Str]
        :middleware [upload/wrap-multipart-params]
      (ok (q/upload-file foo )))



      ;
      ;(POST "/uplaod_answer" []
      ;  :multipart-params [foo :- upload/TempFileUpload email :- s/Str]
      ;  :middleware [upload/wrap-multipart-params]
      ;  (ok (q/upload-answerfile email foo)))

      )

    ))





  (def handler
  (wrap-cors app :access-control-allow-origin [#"http://localhost:3001"]
                       :access-control-allow-methods [:get :put :post :delete]))
   
      

