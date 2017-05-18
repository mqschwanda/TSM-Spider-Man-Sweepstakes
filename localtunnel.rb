# RUBY FILE
# script restarts localtunnel on a failure

require 'optparse'

options = {:subdomain => 'defaultdomain', :port => 4567}

parser = OptionParser.new do|opts|
    opts.banner = "Usage: localtunnel.rb [options]"
    opts.on('-s', '--subdomain subdomain', 'Subdomain') do |subdomain|
        options[:subdomain] = subdomain;
    end

    opts.on('-p', '--port port', 'Port') do |port|
        options[:port] = port;
    end

    opts.on('-h', '--help', 'Displays Help') do
        puts opts
        exit
    end
end

parser.parse!

def ordinal(number) # convert number to human ordinal
  abs_number = number.to_i.abs # number to absolute number

  if (11..13).include?(abs_number % 100) # the 11th, 12th and 13th out of every 100 numbers
    "th"
  else
    case abs_number % 10
      when 1; "st"
      when 2; "nd"
      when 3; "rd"
      else    "th"
    end
  end
end

def ordinalize(number)
  "#{number}#{ordinal(number)}"
end

start_count = 0

while true
    start_count += 1

    if start_count > 0
      if start_count > 1
        puts "localtunnel restarted.... (#{ordinalize(start_count)} time)"
      else
        puts "localtunnel connected! => #{options[:subdomain]}.localtunnel.me"
      end
    end

    `lt --port #{options[:port]} --subdomain #{options[:subdomain]}`
end
