CONFIG = ENV['CONFIG'] || 'Debug'
require 'rack'

namespace :test do
  desc "Run all acceptance tests"
  task :acceptance do
    system("rspec spec/acceptance/end_to_end.rb --color")
  end

  desc "Run all unit tests"
  task :unit do
    system("node node_modules/jasmine-node/lib/jasmine-node/cli.js spec/unit --color")
  end

  desc "Run all integration tests"
  task :integration do
    File.delete("spec/integration/runner/all_tests.js") if File.file?("spec/integration/runner/all_tests.js")
    File.open("spec/integration/runner/all_tests.js", 'w') do |f|
      Dir.glob("spec/integration/*_spec.js").each do |file_name|
        file_name = file_name.slice(/[a-zA-z]*_spec/)
        f.write("require('#{file_name}');\n")
      end
    end
    system("./bin/build_integration_tests.js")
    system("open spec/integration/runner/runner.html")
  end

  task :all => [:unit, :acceptance]
end

desc "Debug the application"
task :debug do
  system("./bin/build_application.js")
  sleep 1
  system("open public/index.html")
end

desc "Run a server for prototyping"
task :server do
  Rack::Handler::Thin.run Rack::Directory.new(File.expand_path('public')), :Port => 3000
end
