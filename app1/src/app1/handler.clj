(ns app1.handler
  (:require [compojure.api.sweet :refer :all]
            [ring.util.http-response :refer :all]
            [schema.core :as s]
            [app1.query :as q]))


(def app
  (api
    {:swagger
     {:ui "/"
      :spec "/swagger.json"
      :data {:info {:title "Evaluate"
                    :description "Compojure Api example"}
             :tags [{:name "api", :description "some apis"}]}}}

    (context "/api" []
      :tags ["api"]


      (GET "/users" []
        (ok (q/get-users )))
      (GET "/api/users/:UserID" []
        :path-params [UserID :- s/Int]
        (ok (q/get-user UserID)))
      (POST "/api/users" []
        :body [user-body q/UserBody]
        (let [{:keys [email mcqmark descmark status]} user-body]
          (ok (q/add-user email mcqmark descmark status))))
      (PUT "/api/users" []
        :body [user-body q/UserBody]
        (let [{:keys [UserID descmark ]} user-body]
          (ok {:updated (q/update-user UserID descmark)})))
      (DELETE "/api/users/UserID" []
        :path-params [UserID :- s/Int]
        (ok {:deleted (q/delete-user UserID)}))

      )))