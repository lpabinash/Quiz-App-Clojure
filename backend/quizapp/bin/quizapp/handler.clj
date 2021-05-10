(ns quizapp.handler
  (:require [compojure.api.sweet :refer :all]
            [ring.util.http-response :refer :all]
            [schema.core :as s]
            [quizapp.query :as q]))


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

      )))
