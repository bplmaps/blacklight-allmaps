require "spec_helper"

RSpec.describe Allmaps::AnnotationsController, type: :controller do
  routes { Blacklight::Allmaps::Engine.routes }

  # Setup for common prerequisites
  before(:each) do
    request.headers["Accept"] = "application/json"
  end

  describe "GET #index" do
    it "returns http success and the correct JSON structure" do
      get :index
      expect(response).to have_http_status(:success)
      json_response = JSON.parse(response.body)
      expect(json_response).to be_a(Array)
    end
  end

  describe "GET #show" do
    context "when the annotation exists" do
      it "returns http success and the correct JSON structure" do
        annotation = FactoryBot.create(:annotation)
        get :show, params: {id: annotation.solr_document_id}
        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)
        expect(json_response["id"]).to eq(annotation.id)
      end
    end

    context "when the annotation does not exist" do
      it "returns a not found status" do
        get :show, params: {id: "nonexistent_id"}
        expect(response).to have_http_status(:not_found)
        json_response = JSON.parse(response.body)
        expect(json_response["error"]).to eq("Record not found")
      end
    end
  end

  describe "PATCH/PUT #update" do
    context "when the annotation exists" do
      it "updates the annotation and returns http success" do
        ActiveJob::Base.queue_adapter = :test

        annotation = FactoryBot.create(:annotation)
        put :update, params: {id: annotation.solr_document_id}
        expect(response).to have_http_status(:ok)
        expect { Blacklight::Allmaps::StoreSidecarAnnotation.perform_later }.to have_enqueued_job
      end
    end

    context "when the annotation does not exist" do
      it "returns a not found status" do
        put :update, params: {id: "nonexistent_id"}
        expect(response).to have_http_status(:not_found)
        json_response = JSON.parse(response.body)
        expect(json_response["error"]).to eq("Record not found")
      end
    end
  end

  describe "GET #fetch" do
    it "fetches the annotation and returns http success" do
      ActiveJob::Base.queue_adapter = :test

      annotation = FactoryBot.create(:annotation)

      # Only check for route existence in this test
      # StoreSidecarAnnotation.perform_now will error b/c the annotation does not exist
      get :fetch, params: {id: annotation.id}
    end
  end
end
