require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get top" do
    get pages_top_url
    assert_response :success
  end

  test "should get example" do
    get pages_example_url
    assert_response :success
  end

  test "should get new_house" do
    get pages_new_house_url
    assert_response :success
  end

  test "should get exterior" do
    get pages_exterior_url
    assert_response :success
  end

  test "should get renovation" do
    get pages_renovation_url
    assert_response :success
  end
end
