class Column
  attr_reader :name, :data_type, :no_null, :unique, :prim_key, :belongs_to
  def initialize(name, data_type, options={})
    @name = name
    @data_type = data_type
    @no_null = options[:no_null]
    @unique = options[:unique]
    @prim_key = options[:prim_key]
    @belongs_to = options[:belongs_to] 
    @value = nil
  end

  def set_val(value)
    @value = value
  end 
  def get_val
    @value
  end
  
  def to_s
    output = "-Column-\n"
    instance_variables.map do |var|
      output += "  " + var.to_s[1..var.length - 1] + ": " + (instance_variable_get var).to_s + "\n"
    end
    return output
  end
end

class Table
  
  def initialize
    @column_values = []
  end

  def self.table_name(name)
    @table_name = name
  end

  def self.get_table_name
    @table_name
  end

  def self.column(*args)
    if @columns == nil
      @columns = []
    end
    if args.include? :prim_key # Autoincrementing primary key
      @columns << (Column.new args[0], :int, prim_key: true)
    else # Arg[1] will be datatype
      options = {}
      options[:no_null] = args.include? :no_null
      options[:unique]  = args.include? :unique
      if args.include? :foreign_key
        i = -1
        # Find foreign key flag index
        # To find index of other tables name
        args.each_with_index do |arg, index|
          if arg == :foreign_key
            i = index
            break
          end
        end
        options[:belongs_to] = args[i + 1]
      end
      @columns << (Column.new args[0], options)
    end
  end

  def self.get_columns
    @columns
  end

  def self.belongs_to(table_name, name)
    column (name.to_s + '_id').to_sym, :foreign_key, table_name
  end

  def method_missing(method_name, *args, &blk)
    if method_name.to_s[0..3] == "get_" # Get value in column
      col_name = method_name.to_s[4..-1]
      self.class.get_columns.each_with_index do |col, index|
        if col.name == col_name.to_sym
          return @column_values[index]
        end
      end
      raise "Column #{col_name} does not exist"
    # Set value in column
    elsif method_name.to_s[0..3] == "set_"
      col_name = method_name.to_s[4..-1]
      self.class.get_columns.each_with_index do |col, index|
        if col.name == col_name.to_sym
          @column_values[index] = args[0]
          return
        end
      end
      raise "Column #{col_name} does not exist"
    end
    super(method_name, *args, &blk)
  end

  def self.insert(values)
    query = "INSERT INTO #{get_table_name} ("
    get_columns.each do |col|
      if !col.prim_key
        query += col.name.to_s + ", "
      end
    end
    query = query[0..-3]
    query += ") VALUES ("
    get_columns.each do |col|
      if !col.prim_key
        query += "?, "
      end
    end
    query = query[0..-3]
    query += ")"
    Database.execute query, values
  end

  def self.select_all(options)
    query = "SELECT * FROM #{get_table_name} "
    if options[:join]
      query += "JOIN #{options[:join].get_table_name} "
      if options[:on]
        query += "ON #{options[:on]} "
      end
    end
    if options[:where]
      query += "WHERE #{options[:where]} "
    end
    if options[:order_by]
      query += "ORDER BY #{options[:order_by]} "
    end
    if options[:limit]
      query += "LIMIT #{options[:limit]} "
    end
    query += ";"
    if options[:debug]
      p query
    end
    Database.execute query, options[:values]
  end

  def self.select(*args)
    if args.length > 1 && args[-1].class == Hash
      options = args[-1]
      columns = args[0..-2]
    else
      options = Hash.new
      columns = args
    end
    if columns[0] == :*
      query = "SELECT * "
    else
      query = "SELECT ("
      columns.each do |col|
        query += col.to_s
        query += ", "
      end
      query = query[0..-3]
      query += ") "
    end
    query += "FROM #{get_table_name} "
    if options[:join]
      query += "JOIN #{options[:join].get_table_name} "
      if options[:on]
        query += "ON #{options[:on]} "
      end
    end
    if options[:where]
      query += "WHERE #{options[:where]} "
    end
    if options[:order_by]
      query += "ORDER BY #{options[:order_by]} "
    end
    if options[:limit]
      query += "LIMIT #{options[:limit]} "
    end
    query += ";"
    if options[:debug]
      p query
    end
    Database.execute query, options[:values]
  end

  def save(*args)
    if args.length == 0
      id_col = self.class.get_columns.select do |col|
        col.name == :id
      end
      id_col = id_col[0].name.to_s
    else
      id_col = args[0]
    end

    query = "UPDATE #{self.class.get_table_name} SET "
    query = self.class.get_columns.inject(query) do |acc, col|
      acc + col.name.to_s + " = ?, "
    end
    query = query[0..-3] # remove last =?,
    
    query += " WHERE #{id_col.to_s} = ?"
    Database.execute(query, @column_values + [@column_values.first])
  end

  def to_s
    output = "TABLE: #{self.class.get_table_name}\n"
    get_columns.each do |col|
      output += col.to_s
    end
    return output
  end

end


