(ns quizapp.handler
  (:require 
            [compojure.api.sweet :refer :all]
            [ring.util.http-response :refer :all]
            [quizapp.middleware :refer [wrap-cors]]
            [schema.core :as s]
            [quizapp.query :as q]
            ))


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
      (GET "/users/UserID" []
        :path-params [UserID :- s/Int]
        (ok (q/get-user UserID)))
      (POST "/add-user" []
        :body [user-body q/UserBody]
        (let [{:keys [email mcqmark descmark status]} user-body]
          (ok (q/add-user email mcqmark descmark status))))
      (PUT "/update-user" []
        :body [user-body q/UserBody]
        (let [{:keys [UserID descmark ]} user-body]
          (ok {:updated (q/update-user UserID descmark)})))
      (DELETE "/users/UserID" []
        :path-params [UserID :- s/Int]
        (ok {:deleted (q/delete-user UserID)})) 

     
      
  

;      (POST "/add-answer" []
;        :body [answer-body q/AddAnswer]
;        (let [{:keys [UserID email question answer]} answer-body]
;          (ok (q/add-answer UserID email question answer))))
;      (GET "/answers/:UserID" []
;        :path-params [UserID :- s/Int]
;        (ok (q/show-answers UserID)))

      )))

  (def handler
  (wrap-cors app :access-control-allow-origin [#"http://localhost:3001"]
                       :access-control-allow-methods [:get :put :post :delete]))
   
      

